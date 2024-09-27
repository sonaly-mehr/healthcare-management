import { Doctor } from '@/types/Doctor';
import Image from 'next/image';
import Link from 'next/link';
import maleDoctor from '../../../../assets/images/male-doctor.jpg';
import femaleDoctor from '../../../../assets/images/female-doctor.jpg';

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const avatar = doctor?.gender === 'MALE' ? maleDoctor : femaleDoctor;

  return (
    <div className="flex flex-col md:flex-row bg-white p-6 shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="flex flex-col items-center md:items-start md:w-1/3 mb-4 md:mb-0">
        <Image
          src={doctor?.profilePhoto || avatar}
          alt="Doctor image"
          width={190}
          height={190}
          className="rounded-full object-cover"
        />
        <h2 className="mt-4 text-xl font-bold text-gray-800">{doctor?.name}</h2>
        <p className="text-gray-500">{doctor?.designation}</p>
        <p className="text-gray-500 text-sm mt-1 w-full">
          {doctor?.doctorSpecialties?.length
            ? 'Specialties: ' + doctor?.doctorSpecialties?.map(specialty => specialty?.specialties?.title).join(', ')
            : ''}
        </p>
      </div>
      <div className="flex flex-col justify-between flex-1 md:w-2/3 md:ml-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">Working at</p>
          <h2 className="font-semibold text-gray-800">{doctor?.currentWorkingPlace}</h2>
        </div>
        <div className="border-b border-gray-200 mb-4"></div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <p className="text-gray-600">Experience</p>
            <h2 className="text-lg font-semibold">{doctor?.experience}+ Years</h2>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Consultation Fee</p>
            <h2 className="text-lg font-semibold text-blue-600">Us: {doctor?.apointmentFee}$</h2>
            <span className="text-sm text-gray-500">(incl. VAT)</span>
          </div>
        </div>
        <div className="flex gap-2 lg:gap-4">
          <Link href={`/checkout/${doctor?.id}`} className="text-sm lg:text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 lg:px-6 rounded transition-colors duration-200 w-full text-center">
            Book Now
          </Link>
          <Link href={`/doctors/${doctor?.id}`} className="text-sm lg:text-base bg-gray-100 hover:bg-gray-200 text-blue-600 font-semibold py-2 px-3 lg:px-6  rounded transition-colors duration-200 w-full text-center">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;