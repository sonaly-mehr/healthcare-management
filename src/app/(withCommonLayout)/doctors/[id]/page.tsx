"use client";
import DashedLine from "@/app/components/ui/DashshedLine";
import { useGetDoctorQuery } from "@/redux/api/doctorsApi";
import Image from "next/image";
import DoctorScheduleSlots from "../components/DoctorScheduleSlots";
import doctorAvatar from '../../../../assets/icons/doctor-logo.png';

type PropTypes = {
  params: {
    id: string;
  };
};

const DoctorsProfilePage = ({ params }: PropTypes) => {
  const { data: doctor } = useGetDoctorQuery(params?.id);
  console.log("doctor", doctor);

  const specialties = doctor?.doctorSpecialties?.map(
    (ds: any) => ds.specialties.title
  );

  return (
    <div className="container mx-auto px-4 mb-16">
      <div className="my-5 text-center">
        <h4 className="text-2xl font-bold">Doctor&apos;s Profile Details</h4>
        <p className="mt-2 text-lg w-full md:w-3/4 mx-auto">
          Compassionate and dedicated doctor committed to delivering
          high-quality care. Proficient in diagnosis, treatment, and advocating
          for comprehensive well-being. Prioritizing patient-centered approaches
          for optimal health outcomes.
        </p>
      </div>

      <div className="my-10 p-3 bg-gray-100">
        <div className="bg-white p-3 rounded-md shadow-md">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-72 h-72">
              <Image
                src={doctor?.profilePhoto || doctorAvatar}
                alt="doctor image"
                width={281}
                height={281}
                className="h-full object-cover rounded-md"
              />
            </div>
            <div className="flex-1">
              <div>
                <h6 className="text-xl font-semibold">{doctor?.name}</h6>
                <p className="my-2 text-gray-600">{doctor?.designation}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <p className="truncate max-w-[45ch]">Specialties in</p>
                  <div className="flex flex-wrap">
                    {specialties?.map((sp: any) => (
                      <span
                        key={sp}
                        className="bg-blue-500 text-white py-1 px-2 rounded mr-1 my-1"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <DashedLine />
              <div>
                <p className="my-2">Working at</p>
                <p>{doctor?.currentWorkingPlace}</p>
              </div>
              <DashedLine />
              <div>
                <div className="flex flex-col md:flex-row items-center">
                  <span className="font-bold text-gray-900">Consultation Fee</span>
                  <div className="ml-2">
                    <p>Taka : {doctor?.apointmentFee} (incl. Vat)</p>
                    <p>Per consultation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 justify-between my-4">
            <div className="bg-gradient-to-b from-blue-300 to-white p-3 flex-1 rounded-md shadow-sm">
              <h6 className="text-lg text-blue-500">Total Experience</h6>
              <p>{doctor?.experience} Years</p>
            </div>
            <div className="bg-gradient-to-b from-blue-300 to-white p-3 flex-1 rounded-md shadow-sm">
              <h6 className="text-lg text-blue-500">Qualification</h6>
              <p>{doctor?.qualification}</p>
            </div>
            <div className="bg-gradient-to-b from-blue-300 to-white p-3 flex-1 rounded-md shadow-sm">
              <h6 className="text-lg text-blue-500">Average Rating</h6>
              <p>{doctor?.averageRating}</p>
            </div>
            <div className="bg-gradient-to-b from-blue-300 to-white p-3 flex-1 rounded-md shadow-sm">
              <h6 className="text-lg text-blue-500">Contact Number</h6>
              <p>{doctor?.contactNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <DoctorScheduleSlots doctorId={params?.id} schedules={doctor?.schedules} />
    </div>
  );
};

export default DoctorsProfilePage;