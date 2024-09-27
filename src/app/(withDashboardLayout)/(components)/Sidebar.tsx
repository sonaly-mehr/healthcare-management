"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { getUserInfo } from "@/services/auth.services";
import { sidebarMenuItems } from "@/utils/sidebarMenuItems";
import { UserRole } from "@/types";
import Image from "next/image";
import assets from "@/assets";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: any) => {
  const path = usePathname();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const { role } = getUserInfo() as any;
    setUserRole(role);
  }, []);
  return (
    <>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <X width={24} height={24} className="text-white" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
              <div className="flex gap-3 items-center">
          <Image
            src={assets.svgs.logo}
            width={20}
            height={20}
            alt="logo"
            className="w-[20px] h-[20px]"
          />
          <h6 className="font-bold text-lg">
            <span className="text-primary">Health</span> Care
          </h6>
        </div>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {sidebarMenuItems(userRole as UserRole).map(
                        (item, index) => (
                          <li key={item.title}>
                            <a
                              href={item.path}
                              className={classNames(
                                path === item?.path
                                  ? "bg-[#F2F8F6] text-primary font-semibold border-l-[2px] border-solid border-primary"
                                  : "text-dark_2 hover:bg-[#F2F8F6] hover:text-primary font-medium hover:border-l-[2px] border-solid border-primary",
                                "group flex gap-x-3 items-center rounded-se-[10px] rounded-ee-[10px] py-3 pl-10 pr-3 text-sm leading-6"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  path === item?.path
                                    ? "text-primary"
                                    : "text-darkGray_2 group-hover:text-primary",
                                  "h-4 w-4 shrink-0"
                                )}
                              >{item?.icon}</span>
                              {item.title}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </li>
                  <li></li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5  border-r border-[#EBEBEB] bg-white pb-4">
          <div className="flex pt-6 pb-8 shrink-0 items-center justify-center">
          <div className="flex gap-3 items-center">
          <Image
            src={assets.svgs.logo}
            width={40}
            height={40}
            alt="logo"
            className="w-[20px] lg:w-[30px] h-[20px] lg:h-[30px]"
          />
          <h6 className="font-bold text-sm lg:text-[22px]">
            <span className="text-primary">Health</span> Care
          </h6>
        </div>
          </div>
          <span className="text-darkGray_2 text-base font-medium pl-10">
            Menu
          </span>
          <nav className="flex flex-1 flex-col pr-6">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mr-1 space-y-3">
                  {sidebarMenuItems(userRole as UserRole).map((item, index) => (
                    <li key={item.title}>
                      <a
                        href={item.path}
                        className={classNames(
                          path === item?.path
                            ? "bg-[#F2F8F6] text-primary font-semibold border-l-[2px] border-solid border-primary"
                            : "text-darkGray hover:bg-[#F2F8F6] hover:text-primary font-medium hover:border-l-[2px] border-solid border-primary",
                          "group flex gap-x-4 items-center rounded-se-[10px] rounded-ee-[10px] py-3 pl-10 pr-3 text-sm leading-6 "
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            path === item?.path
                              ? "text-primary"
                              : "text-darkGray group-hover:text-primary",
                            "shrink-0"
                          )}
                        >{item?.icon}</span>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
