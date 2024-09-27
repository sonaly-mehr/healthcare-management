"use client";
import { NAV_ITEMS } from "@/constants";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import dynamic from "next/dynamic";
import Image from "next/image";
import assets from "@/assets";
import { getUserInfo } from "@/services/auth.services";

const Navbar = () => {
  const userInfo = getUserInfo(); // Assuming this returns the user information if logged in

  // Filter NAV_ITEMS to include the "Dashboard" link only for logged-in users
  const filteredNavItems = userInfo?.id
    ? NAV_ITEMS // Show all items if user is logged in
    : NAV_ITEMS.filter(item => item?.lable !== 'Dashboard'); // Exclude Dashboard if not logged in

  const AuthButton = dynamic(() => import("@/app/components/ui/AuthButton"), {
    ssr: false,
  });

  return (
    <div className="container my-3 lg:my-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Image
            src={assets.svgs.logo}
            width={50}
            height={50}
            alt="logo"
            className="w-[40px] lg:w-[50px] h-[40px] lg:h-[50px]"
          />
          <h6 className="font-bold text-[22px] lg:text-3xl">
            <span className="text-primary">Health</span> Care
          </h6>
        </div>

        <ul className="hidden md:flex gap-10 items-center">
          {filteredNavItems.map((item) => (
            <li key={item?.lable}>
              <Link
                href={item.link}
                className="hover:text-primary transition duration-150 ease-in-out text-darkGray"
              >
                {item?.lable}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-3 items-center">
          <AuthButton />
          {/* Hamburger menu */}
          <Sheet>
            <SheetTrigger>
              <Menu
                width={30}
                height={30}
                color="#000"
                className="block md:hidden"
              />
            </SheetTrigger>
            <SheetContent>
              <ul className="flex flex-col gap-5 pt-14">
                {filteredNavItems.map((item: any) => (
                  <li key={item.lable}>
                    <Link
                      href={item.link}
                      className="hover:text-primary transition duration-150 text-xs ease-in-out font-medium uppercase text-darkGray"
                    >
                      {item.lable}
                    </Link>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;