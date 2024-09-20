import assets from "@/assets";
import chooseUsImg from "@/assets/choose-us.png";
import Image from "next/image";

const servicesData = [
  {
    imageSrc: assets.svgs.award,
    title: "Award Winning Service",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
  {
    imageSrc: assets.svgs.care,
    title: "Best Quality Pregnancy Care",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
  {
    imageSrc: assets.svgs.equipment,
    title: "Complete Medical Equipments",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
  {
    imageSrc: assets.svgs.call,
    title: "Dedicated Emergency Care",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
];

const WhyUs = () => {
  return (
    <div className="container mx-auto my-10">
      <div className="text-center">
        <h1 className="text-primary text-xl lg:text-2xl font-bold">Why Us</h1>
        <h2 className="text-2xl lg:text-4xl font-bold">Why Choose Us</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10 items-center">
        <div>
          {servicesData.map((service, index) => (
            <div
              key={index}
              className={`flex gap-4 bg-gray-100 p-4 items-center rounded-lg mb-4 ${
                index % 2 === 0 ? "rounded-r-full" : "rounded-l-full"
              }`}
            >
              <div className="bg-white p-4 rounded-lg">
                <Image src={service.imageSrc} width={50} alt={service.title} />
              </div>
              <div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <Image src={chooseUsImg} width={400} alt="choose us" />
        </div>
      </div>
    </div>
  );
};

export default WhyUs;