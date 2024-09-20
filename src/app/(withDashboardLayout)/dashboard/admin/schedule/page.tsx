"use client";

import ScheduleTable from "@/app/components/layout/tables/ScheduleTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Form from "@/app/components/ui/Forms/Form";

const Page = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState<string | null>(
    dayjs().format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string | null>(
    dayjs().format("YYYY-MM-DD")
  );
  const [startTime, setStartTime] = useState<string | null>(
    dayjs().format("HH:mm")
  );
  const [endTime, setEndTime] = useState<string | null>(
    dayjs().format("HH:mm")
  );
  const [isOpen, setIsOpen] = useState(false);

  const [createSchedule] = useCreateScheduleMutation();

  const handleDateChange =
    (setter: (date: string | null) => void, format: string) =>
    (date: Date | null) => {
      setter(date ? dayjs(date).format(format) : null);
    };

  const handleFormSubmit = async (values: FieldValues) => {
    const formattedValues = {
      startDate: startDate || values.startDate,
      endDate: endDate || values.endDate,
      startTime: startTime || values.startTime,
      endTime: endTime || values.endTime,
    };

    try {
      const res = await createSchedule(formattedValues).unwrap();
      if (res?.id) {
        toast.success("Schedules created successfully!");
        setIsOpen(false); // Close the dialog
        router.push('/dashboard/admin/schedule');
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Doctors
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the Schedules in the portal including their date and
              time.
            </p>
          </div>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full max-w-xs" onClick={() => setIsOpen(true)}>Create Schedule</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-4 bg-white rounded-lg shadow-md">
            <Form onSubmit={handleFormSubmit}>
              <DialogHeader>
                <DialogTitle>Create Schedule</DialogTitle>
                <DialogDescription>Make New Schedule here.</DialogDescription>
              </DialogHeader>
              <div className="flex justify-center w-full">
                <div className="flex flex-col gap-2">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date:
                    </label>
                    <DatePicker
                      selected={startDate ? new Date(startDate) : null}
                      onChange={handleDateChange(setStartDate, "YYYY-MM-DD")}
                      dateFormat="yyyy-MM-dd"
                      className="block w-[300px] mt-1 p-2 cursor-pointer border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Date:
                    </label>
                    <DatePicker
                      selected={endDate ? new Date(endDate) : null}
                      onChange={handleDateChange(setEndDate, "YYYY-MM-DD")}
                      dateFormat="yyyy-MM-dd"
                      className="block w-[300px] mt-1 p-2 cursor-pointer border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Time:
                    </label>
                    <DatePicker
                      selected={
                        startTime
                          ? new Date(`1970-01-01T${startTime}:00`)
                          : null
                      }
                      onChange={handleDateChange(setStartTime, "HH:mm")}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      className="block w-[300px] mt-1 p-2 cursor-pointer border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Time:
                    </label>
                    <DatePicker
                      selected={
                        endTime ? new Date(`1970-01-01T${endTime}:00`) : null
                      }
                      onChange={handleDateChange(setEndTime, "HH:mm")}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      className="block w-[300px] mt-1 p-2 cursor-pointer border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <Button type="submit">Submit</Button>
                </div>
              </div>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Table */}
      <ScheduleTable />
    </div>
  );
};

export default Page;