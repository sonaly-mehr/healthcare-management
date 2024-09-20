import Image from "next/image";
import femaleDocImg from "@/assets/how-it-works-img.png";
import searchIcon from "@/assets/icons/search-icon.png";
import doctorIcon from "@/assets/icons/doctor-icon.png";
import appointmentIcon from "@/assets/icons/appointment-icon.png";
import charityIcon from "@/assets/icons/charity-icon.png";

const HowItWorks = () => {
  return (
    <div className="container mx-auto my-16 lg:my-10">
      <div className="text-center mb-10">
        <p className="text-primary text-xl lg:text-2xl font-bold mb-1.5">How it Works</p>
        <h1 className="text-2xl lg:text-4xl font-semibold">4 Easy Steps to Get Your Solution</h1>
        <p className="text-xl lg:text-lg font-normal mt-2">Access to expert physicians and surgeons, advanced technologies</p>
        <p className="text-base lg:text-lg font-normal">and top-quality surgery facilities right here.</p>
      </div>
      <div className="flex flex-wrap mt-5">
        <div className="w-full md:w-1/2 p-2">
          <Image src={femaleDocImg} alt="doctor image" />
        </div>
        <div className="w-full md:w-1/2 p-2">
          <div className="flex flex-wrap">
            {[
              { icon: searchIcon, title: "Search Doctor", text: "Dolor sit amet consectetur. Scelerisque in eu mauris volutpat Ornare." },
              { icon: doctorIcon, title: "Check Doctor Profile", text: "Dolor sit amet consectetur. Scelerisque in eu mauris volutpat Ornare." },
              { icon: appointmentIcon, title: "Schedule Appointment", text: "Dolor sit amet consectetur. Scelerisque in eu mauris volutpat Ornare." },
              { icon: charityIcon, title: "Get Your Solution", text: "Dolor sit amet consectetur. Scelerisque in eu mauris volutpat Ornare." }
            ].map((step, index) => (
              <div key={index} className="w-full md:w-1/2 p-2">
                <div className="bg-white border border-gray-300 rounded-lg p-5">
                  <Image src={step.icon} alt={step.title.toLowerCase().replace(" ", "-")} />
                  <h2 className="text-xl font-medium mt-3">{step.title}</h2>
                  <p className="text-sm font-normal mt-1">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;