import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/landing_page/facebook.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import twitterIcon from "@/assets/landing_page/twitter.png";
import linkedIcon from "@/assets/landing_page/linkedin.png";
import { NAV_ITEMS } from "@/constants";

const Footer = () => {
  return (
    <div className="bg-[rgb(17,26,34)] py-5 overflow-hidden">
      <div className="container">
        <ul className="flex gap-4 items-center">
          {NAV_ITEMS.map((item) => (
            <li>
              <Link href={item?.link}>{item?.lable}</Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-2 justify-center py-3">
          <Image src={facebookIcon} width={30} height={30} alt="facebook" />
          <Image src={instagramIcon} width={30} height={30} alt="facebook" />
          <Image src={twitterIcon} width={30} height={30} alt="facebook" />
          <Image src={linkedIcon} width={30} height={30} alt="facebook" />
        </div>
        <div className="border-b-[1px] border-dashed"></div>
        <div className="flex flex-col lg:flex-row gap-2 justify-center lg:justify-between items-center py-3">
          <p className="text-sm lg:text-base text-white">
            &copy;2024 Ph HealthCare. All Rights Reserved.
          </p>
          <Link className="font-semibold text-white" href="/">
            <span className="text-sm lg:text-base text-primary">Health</span> Care
          </Link>
          <p className="text-sm lg:text-base text-white">Privacy Policy! Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
