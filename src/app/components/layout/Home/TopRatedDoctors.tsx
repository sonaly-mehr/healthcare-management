import { MapPin } from "lucide-react";
import Image from "next/image";
import doctorDemoImg from '../../../../assets/landing_page/doctor-img-demo.webp'
import Link from "next/link";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

const TopRatedDoctors = async () => {
  const res = await fetch("http://localhost:5000/api/v1/doctor?page=1&limit=3");
  const { data: doctors } = await res.json();
  //   console.log(doctors);
  return (
    <div className="my-10 py-[180px] bg-gray-100 clip-path-polygon">
      <div className="text-center">
        <h1 className="text-2xl lg:text-4xl font-bold pt-10">Our Top Rated Doctors</h1>
        <p className="lg:text-lg font-normal mt-2">
          Access to expert physicians and surgeons, advanced technologies
        </p>
        <p className="lg:text-lg font-normal">
          and top-quality surgery facilities right here.
        </p>
      </div>

      <div className="container mx-auto my-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {doctors.map((doctor: any) => (
            <div key={doctor.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <Image
                src={doctor?.profilePhoto ? doctor?.profilePhoto : doctorDemoImg}
                alt="doctor"
                width={500}
                height={100}
                className="w-full h-[200px] object-contain"
              />
              <div className="p-4">
                <h5 className="text-xl font-semibold mb-2">{doctor?.name}</h5>
                <p className="text-gray-700">{doctor?.qualification}, {doctor?.designation}</p>
                <p className="text-gray-700 mt-1 flex items-center">
                  <MapPin className="mr-1" /> {doctor?.address}
                </p>
              </div>
              <div className="flex justify-between p-4">
                <Link href={`/doctors/${doctor?.id}`} className="bg-blue-500 text-white py-2 px-4 rounded-lg">Book Now</Link>
                <Link href={`/doctors/${doctor?.id}`} className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg">View Profile</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/doctors" className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
            View ALL
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopRatedDoctors;