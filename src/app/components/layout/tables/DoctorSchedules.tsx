"use client";
import {
  useDeleteDoctorScheduleMutation,
  useGetMyScheduleQuery,
} from "@/redux/api/doctorScheduleApi";
import React, { useState } from "react";
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import ClipLoader from "react-spinners/ClipLoader";
import { Delete, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DoctorSchedules = () => {
  const router = useRouter();
  const [deleteDoctorSchedule] = useDeleteDoctorScheduleMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(
    null
  );

  const handleDelete = async () => {
    if (selectedScheduleId) {
      try {
        const res = await deleteDoctorSchedule(selectedScheduleId).unwrap(); // Call the mutation function
        if (res) {
          toast.success("Schedule deleted!");
          router.refresh(); // Refresh the schedule list
        }
      } catch (error) {
        toast.error("Failed to delete schedule!");
      } finally {
        setIsDialogOpen(false); // Close the dialog after deletion
        setSelectedScheduleId(null);
      }
    }
  };

  const openDialog = (id: string) => {
    setSelectedScheduleId(id);
    setIsDialogOpen(true);
  };
  const { data, isLoading } = useGetMyScheduleQuery({});
  console.log("my schedule data", data);

  const hasSchedules = data?.length ?? 0;
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle ">
            {isLoading ? (
              <div className="flex justify-center w-full items-center h-full mt-36">
                <ClipLoader
                  loading={true}
                  color="#2563EB"
                  speedMultiplier={1}
                  cssOverride={{}}
                  size={50}
                />
              </div>
            ) : (
              <>
                {hasSchedules <= 0 ? (
                  <p className="font-medium text-lg text-center text-black mt-10">
                    No Schedule Found
                  </p>
                ) : (
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                        >
                          Start Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          End Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Start Time
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          End Time
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {data?.map((schedule: any, index: number) => (
                        <tr key={index} className="even:bg-gray-50">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                            {dateFormatter(schedule?.schedule?.startDate)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {dateFormatter(schedule.schedule?.endDate)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {dayjs(schedule?.schedule?.startDate).format(
                              "hh:mm A"
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {dayjs(schedule.schedule?.endDate).format(
                              "hh:mm A"
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <Trash2
                              width={20}
                              height={20}
                              className="text-red-500 cursor-pointer"
                              onClick={() => openDialog(schedule?.schedule.id)} // Open dialog
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
        {/* Confirmation Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this schedule?</p>
            <DialogFooter>
              <Button className="text-black border border-blue-100" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleDelete} variant="destructive">Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DoctorSchedules;
