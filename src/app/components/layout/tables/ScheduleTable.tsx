"use client";
import ClipLoader from "react-spinners/ClipLoader";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { getUserInfo } from "@/services/auth.services";
import {
  useDeleteScheduleMutation,
  useGetAllSchedulesQuery,
} from "@/redux/api/scheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ScheduleTable = () => {
  const userInfo = getUserInfo();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of schedules per page
  const { data, isLoading } = useGetAllSchedulesQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const totalPages = Math.ceil((data?.meta?.total || 0) / itemsPerPage);

  const [deleteSchedule] = useDeleteScheduleMutation();
  console.log("schedule data", data);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSchedule(id).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Schedule deleted successfully!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const hasSchedules = data?.schedules?.length ?? 0;

  //pagination
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
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
                    <>
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
                          {data?.schedules?.map(
                            (schedule: any, index: number) => (
                              <tr key={index} className="even:bg-gray-50">
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                  {dateFormatter(schedule.startDate)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {dateFormatter(schedule.endDate)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {dayjs(schedule?.startDate).format("hh:mm A")}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {dayjs(schedule?.endDate).format("hh:mm A")}
                                </td>
                                <td className="flex items-center gap-3 justify-end relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                  <Pencil
                                    className="text-primary cursor-pointer"
                                    width={18}
                                    height={18}
                                  />
                                  <AlertDialog>
                                    <AlertDialogTrigger>
                                      <Trash
                                        className="text-red-600 cursor-pointer"
                                        width={18}
                                        height={18}
                                      />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="max-w-sm">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Are you sure you want to delete?
                                        </AlertDialogTitle>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel className="text-black">
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() =>
                                            handleDelete(schedule?.id)
                                          }
                                          className="bg-red-600"
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      {/* Pagination Component */}
                      <Pagination className="my-4">
                        <PaginationPrevious
                          onClick={() => handlePageChange(currentPage - 1)}
                        />
                        {[...Array(totalPages)].map((_, index) => (
                          <PaginationItem key={index}>
                            <PaginationLink
                              isActive={index + 1 === currentPage}
                              onClick={() => handlePageChange(index + 1)}
                              
                            >
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationNext
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="mr-3"
                        />
                      </Pagination>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleTable;
