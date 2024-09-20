import Image from "next/image";
import HeroSection from "../components/layout/Home/Hero";
import HowItWorks from "../components/layout/Home/HowItWorks";
import WhyUs from "../components/layout/Home/WhyUs";
import Specialist from "../components/layout/Home/Specialists";
import TopRatedDoctors from "../components/layout/Home/TopRatedDoctors";
import Stats from "../components/layout/Home/Stat";

export default function Home() {
  return (
    <main>
     <HeroSection/>
     <HowItWorks/>
     <Specialist/>
     <TopRatedDoctors/>
     <WhyUs/>
     <Stats/>
    </main>
  );
}
