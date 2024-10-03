"use client";
import { useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";
import { dateFormatter } from "@/utils/dateFormatter";
import Link from "next/link";
import { getTimeIn12HourFormat } from "@/utils/getTimeIn12HourFormat";
import Chips from "@/app/components/ui/Chips";

const PaymentHistory = () => {
  const { data, isLoading } = useGetMyAppointmentsQuery({});
  const appointments = data?.appointments || [];

  const renderCell = (row: any, type: any) => {
    switch (type) {
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
          <>
            {row.paymentStatus === "UNPAID" && (
              <Link
                href="/payment"
                className="p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm transition duration-200"
              >
                Make Payment
              </Link>
            )}
          </>
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
            <thead>
              <tr className="bg-blue-100">
                <th className="py-3 px-4 text-center font-semibold text-gray-800">Appointment Date</th>
                <th className="py-3 px-4 text-center font-semibold text-gray-800">Appointment Time</th>
                <th className="py-3 px-4 text-center font-semibold text-gray-800">Payment Status</th>
                <th className="py-3 px-4 text-center font-semibold text-gray-800">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.length > 0 ? (
                (appointments as any[]).map((row) => (
                  <tr
                    key={row?.id}
                    className="border-t border-gray-300 hover:bg-gray-50 transition duration-200"
                  >
                    <td className="py-4 px-4 text-center">
                      {renderCell(row, "appointmentDate")}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {renderCell(row, "appointmentTime")}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {renderCell(row, "paymentStatus")}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {renderCell(row, "action")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center font-medium text-base text-gray-500">
                    No Payment history found!
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

export default PaymentHistory;