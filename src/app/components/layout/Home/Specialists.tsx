import Image from "next/image";
import Link from "next/link";

const Specialist = async () => {
  const res = await fetch("http://localhost:5000/api/v1/specialties", {
    next: {
      revalidate: 30,
    },
  });
  const { data: specialties } = await res.json();
  //   console.log(specialties);
  return (
    <div className="container mx-auto my-14 lg:my-20 text-center">
      <div className="text-left">
        <h1 className="text-2xl lg:text-4xl font-semibold">Explore Treatments Across Specialties</h1>
        <p className="lg:text-lg font-light mt-1">Experienced Doctors Across All Specialties</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-5">
        {specialties.map((specialty: any) => (
          <div
            key={specialty.id}
            className="flex-1 w-36 bg-gray-100 border rounded-lg text-center p-10 border-blue-500 hover:rounded-lg hover:cursor-pointer hover:transition-all hover:duration-500"
          >
            <Image
              src={specialty.icon ? specialty.icon : ''}
              width={50}
              height={50}
              alt="specialty icon"
              className="mx-auto"
            />
            <div>
              <p className="text-lg font-semibold mt-2">{specialty.title}</p>
            </div>
          </div>
        ))}
      </div>
      <Link href="/doctors" className="mt-5 border inline-block border-blue-500 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
        View ALL
      </Link>
    </div>
  );
};

export default Specialist;