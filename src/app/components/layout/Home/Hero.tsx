import Image from "next/image";
import assets from "@/assets";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="container my-10 lg:my-20 flex flex-col-reverse lg:flex-row justify-between items-center overflow-hidden">
      <div className="lg:flex-1 relative pt-20 lg:pt-0">
        <div className="absolute w-auto lg:w-[700px] left-[-90px] top-0 lg:top-[-120px]">
          <Image src={assets.svgs.grid} alt="doctor1" />
        </div>
        <h2 className="font-semibold text-4xl lg:text-6xl">Healthier Hearts</h2>
        <h2 className="font-semibold text-4xl lg:text-6xl">Come From</h2>
        <h2 className="font-semibold  text-primary text-4xl lg:text-6xl">
          Preventive Care
        </h2>
        <p className="my-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit eum
          iusto consequatur eius, doloribus nesciunt facere aliquid eveniet et.
          Rerum maiores saepe cupiditate repellat recusandae atque sed. Saepe,
          vitae id?
        </p>
        <div className="flex gap-4 lg:gap-2 mt-6 lg:mt-10 relative z-10">
          <Button asChild>
            <Link href="/doctors">Make appointment</Link></Button>
          <Button variant="outline" className="border-blue-400 text-black">Contact us</Button>
        </div>
      </div>

      <div className="p-1 lg:flex-1 flex justify-center relative mt-0">
        <div className="absolute left-[200px] top-[-30px]">
          <Image
            src={assets.svgs.arrow}
            width={100}
            height={100}
            alt="arrow"
            className=""
          />
        </div>
        <div className="flex gap-2">
          <div className="mt-4">
            <Image
              src={assets.images.doctor1}
              width={240}
              height={380}
              alt="doctor1"
            />
          </div>
          <div>
            <Image
              src={assets.images.doctor2}
              width={240}
              height={350}
              alt="doctor2"
            />
          </div>
        </div>
        <div className="absolute top-[170px] lg:top-[220px] left-[80px] lg:left-[150px]">
          <Image
            src={assets.images.doctor3}
            width={240}
            height={240}
            alt="doctor3"
            className="w-[150px] h-[150px] lg:w-[240px] lg:h-[240px]"
          />
        </div>
        <div className="absolute bottom-[-30px] lg:bottom-[-50px] right-0 z-[-1] ">
          <Image
            src={assets.images.stethoscope}
            width={180}
            height={180}
            alt="doctor3"
            className="w-[100px] h-[100px] lg:w-[180px] lg:h-[180px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
