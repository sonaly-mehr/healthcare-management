"use client";
import { useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useCreateAppointmentMutation } from "@/redux/api/appointmentApi";
import { getUserInfo } from "@/services/auth.services";
import { toast } from "sonner";

type DoctorScheduleSlotsProps = {
  doctorId: string;
  schedules: any[]; // Replace 'any' with the correct type if available
};

const DoctorScheduleSlots = ({ doctorId, schedules }: DoctorScheduleSlotsProps) => {
  const [scheduleId, setScheduleId] = useState("");
  const router = useRouter();
  const userInfo = getUserInfo();

  const [createAppointment] = useCreateAppointmentMutation();

  const currentDate = new Date();
  const today = currentDate.toLocaleDateString("en-US", { weekday: "long" });

  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);
  const tomorrow = nextDate.toLocaleDateString("en-US", { weekday: "long" });

  // Filter schedules for today
  const todayStart = dayjs().startOf("day").toISOString();
  const todayEnd = dayjs().endOf("day").toISOString();
  const availableSlots = schedules?.filter(
    (schedule) =>
      !schedule.isBooked &&
      schedule.schedule.startDate >= todayStart &&
      schedule.schedule.startDate <= todayEnd
  );

  // Filter schedules for tomorrow
  const tomorrowStart = dayjs(nextDate).startOf("day").toISOString();
  const tomorrowEnd = dayjs(nextDate).endOf("day").toISOString();
  const availableNextDaySlots = schedules?.filter(
    (schedule) =>
      !schedule.isBooked &&
      schedule.schedule.startDate >= tomorrowStart &&
      schedule.schedule.startDate <= tomorrowEnd
  );

//   const [createAppointment] = useCreateAppointmentMutation();
//   const [initialPayment] = useInitialPaymentMutation();

  // Handle booking appointment
  const handleBookAppointment = async () => {
    try {
      if(userInfo?.role && userInfo?.role==="patient"){
      if (doctorId && scheduleId) {
        const res = await createAppointment({
          doctorId,
          scheduleId,
        }).unwrap();

        if (res.id) {
         //  const response = await initialPayment(res.id).unwrap();

         //  if (response.paymentUrl) {
         //    router.push(response.paymentUrl);
         //  }
         router.push("/payment")
        }
      }
   } else{
      toast.error("You must login to book appointment!")
      router.push("/login")
   }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-4 mt-1 rounded shadow">
      <h4 className="mb-3 text-blue-600 text-2xl">Availability</h4>
      
      {/* Today's Slots */}
      <h6 className="text-lg font-bold">Today: {today}</h6>
      <div className="border-b-2 border-dashed border-gray-300 my-2" />
      <div className="flex flex-wrap gap-2">
        {availableSlots?.length ? (
          availableSlots?.map((schedule) => {
            const formattedTimeSlot = `${dayjs(schedule.schedule.startDate).format("hh:mm A")} - ${dayjs(schedule.schedule.endDate).format("hh:mm A")}`;

            return (
              <button
                key={schedule?.scheduleId}
                className={`p-2 border rounded transition-all ${
                  schedule.scheduleId === scheduleId
                    ? "bg-blue-500 text-white"
                    : "border-blue-500 text-blue-500"
                }`}
                onClick={() => setScheduleId(schedule.scheduleId)}
              >
                {formattedTimeSlot}
              </button>
            );
          })
        ) : (
          <span className="text-red-500">No Schedule is Available Today!</span>
        )}
      </div>

      {/* Tomorrow's Slots */}
      <h6 className="text-lg font-bold mt-5">Tomorrow: {tomorrow}</h6>
      <div className="border-b-2 border-dashed border-gray-300 my-2" />
      <div className="flex flex-wrap gap-2">
        {availableNextDaySlots?.length ? (
          availableNextDaySlots.map((schedule) => {
            const formattedTimeSlot = `${dayjs(schedule.schedule.startDate).format("hh:mm A")} - ${dayjs(schedule.schedule.endDate).format("hh:mm A")}`;

            return (
              <button
                key={schedule?.scheduleId}
                className={`p-2 border rounded transition-all ${
                  schedule?.scheduleId === scheduleId
                    ? "bg-blue-500 text-white"
                    : "border-blue-500 text-blue-500"
                }`}
                onClick={() => setScheduleId(schedule?.scheduleId)}
              >
                {formattedTimeSlot}
              </button>
            );
          })
        ) : (
          <span className="text-red-500">No Schedule is Available Tomorrow!</span>
        )}
      </div>

      {/* Book Appointment Button */}
      <button
        onClick={handleBookAppointment}
        disabled={!scheduleId}
        className="bg-green-500 text-white py-2 px-4 rounded mt-3"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorScheduleSlots;