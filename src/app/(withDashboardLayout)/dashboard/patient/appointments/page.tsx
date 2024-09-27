"use client";
import { useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";
import { dateFormatter } from "@/utils/dateFormatter";
import Link from "next/link";
import { getTimeIn12HourFormat } from "@/utils/getTimeIn12HourFormat";
import Chips from "@/app/components/ui/Chips";

const PatientAppointmentsPage = () => {
  const { data, isLoading } = useGetMyAppointmentsQuery({});
  console.log("data", data);
  const appointments = data?.appointments;

  const renderCell = (row: any, type: any) => {
    switch (type) {
      case "doctorName":
        return (
          <div>
            <span className="font-semibold">{row.doctor.name}</span>
            <div className="text-gray-500 text-sm">{row.doctor.designation}</div>
          </div>
        );
      case "appointmentDate":
        return dateFormatter(row.schedule?.startDate);
      case "appointmentTime":
        return getTimeIn12HourFormat(row.schedule?.startDate);
      case "paymentStatus":
        return row.paymentStatus === "PAID" ? (
          <Chips label={row.paymentStatus} type="success" />
        ) : (
          <Chips label={row.paymentStatus} type="error" />
        );
      case "action":
        return (
          <Link
            href={`/video?videoCallingId=${row?.videoCallingId}`}
            className={`p-2 rounded-full ${
              row.paymentStatus === "UNPAID" ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={row.paymentStatus === "PAID" ? "currentColor" : "gray"}
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path d="M17 10.5V7c0-.6-.4-1-1-1H6c-.6 0-1 .4-1 1v10c0 .6.4 1 1 1h10c.6 0 1-.4 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      {!isLoading ? (
        <div className="overflow-x-auto my-4 shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead className="bg-gray-200">
              <tr className="bg-blue-100">
                <th className="py-3 px-4 text-left font-semibold text-gray-800">Doctor Name</th>
                <th className="py-3 px-4 text-center font-semibold text-gray-800">Appointment Date</th>
                <th className="py-3 px-4 text-center font-semibold text-gray-800">Appointment Time</th>
                <th className="py-3 px-4 text-center font-semibold text-gray-800">Payment Status</th>
                <th className="py-3 px-4 text-center font-semibold text-gray-800">Join</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.length > 0 ? (
                appointments?.map((row, index) => (
                  <tr
                    key={row?.id}
                    className={`border-t border-gray-300 hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    <td className="py-4 px-4">{renderCell(row, "doctorName")}</td>
                    <td className="py-4 px-4 text-center">{renderCell(row, "appointmentDate")}</td>
                    <td className="py-4 px-4 text-center">{renderCell(row, "appointmentTime")}</td>
                    <td className="py-4 px-4 text-center">{renderCell(row, "paymentStatus")}</td>
                    <td className="py-4 px-4 text-center">{renderCell(row, "action")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center font-medium text-base text-gray-500">
                    No Appointment found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-center text-xl font-medium">Loading.....</h1>
      )}
    </div>
  );
};

export default PatientAppointmentsPage;