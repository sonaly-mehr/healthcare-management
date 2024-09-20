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
import { useCreateDoctorScheduleMutation } from "@/redux/api/doctorScheduleApi";
import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import dayjs from "dayjs";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { getUserInfo } from "@/services/auth.services";
import DoctorSchedules from "@/app/components/layout/tables/DoctorSchedules";
import { toast } from "sonner";
import { useGetMyScheduleQuery } from "@/redux/api/doctorScheduleApi"; // Import doctor's schedules

const Page = () => {
  const userInfo = getUserInfo();
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>([]);

  const query: Record<string, any> = {};
  if (selectedDate) {
    query["startDate"] = selectedDate;
    query["endDate"] = selectedDate;
  }

  // Fetch available schedules and doctor's existing schedules
  const { data: availableSchedulesData } = useGetAllSchedulesQuery(query);
  const availableSchedules = availableSchedulesData?.schedules;

  const { data: doctorSchedulesData } = useGetMyScheduleQuery({});
  const doctorSchedules = doctorSchedulesData || [];

  const [createDoctorSchedule, { isLoading }] =
    useCreateDoctorScheduleMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await createDoctorSchedule({
        scheduleIds: selectedScheduleIds,
      });

      if (res) {
        toast.success("Schedule created successfully!");
      }
    } catch (error) {
      toast.error("Failed to create schedule. Please try again.");
    }
  };

  interface ISchedule {
    id: string;
    startDate: string;
    endDate: string;
  }

  const handleSelectChange = (value: string) => {
    setSelectedScheduleIds((prev) => [...prev, value]);
  };

  // Filter out schedules already selected by the doctor
  const filteredSchedules = availableSchedules?.filter((schedule: ISchedule) => {
    return !doctorSchedules.some((doctorSchedule: any) =>
      dayjs(doctorSchedule.schedule.startDate).isSame(schedule.startDate) &&
      dayjs(doctorSchedule.schedule.endDate).isSame(schedule.endDate)
    );
  });

  return (
    <div>
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Schedules
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the schedules based on your availability.
            </p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Schedule</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Schedule</DialogTitle>
              <DialogDescription>Make a new schedule here.</DialogDescription>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <Calendar
                  mode="single"
                  selected={selectedDate ? new Date(selectedDate) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(dayjs(date).format("YYYY-MM-DD"));
                    } else {
                      setSelectedDate(undefined);
                    }
                  }}
                  className="rounded-md border shadow w-full flex items-center justify-center h-full"
                />
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Date" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black w-[375px]">
                    <SelectGroup>
                      <SelectLabel>
                        {filteredSchedules && filteredSchedules.length > 0
                          ? "Available Slots"
                          : "No available slots found"}
                      </SelectLabel>
                      {filteredSchedules?.map((schedule: ISchedule) => (
                        <SelectItem
                          key={schedule.id}
                          value={schedule.id}
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          {dayjs(schedule.startDate).format("hh:mm A")} -{" "}
                          {dayjs(schedule.endDate).format("hh:mm A")}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button size="lg" type="submit" className="text-base">
                  Create Schedule
                </Button>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Table */}
      <DoctorSchedules />
    </div>
  );
};

export default Page;