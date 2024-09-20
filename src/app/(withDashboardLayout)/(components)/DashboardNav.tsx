"use client";
import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Link from "next/link";
import { MessageIcon } from "@/app/components/ui/icons/MessageIcon";
import { SettingsIcon } from "@/app/components/ui/icons/SettingsIcon";
import { NotificationIcon } from "@/app/components/ui/icons/NotificationIcon";
import { AlignJustify, ChevronDown } from "lucide-react";
import { removeUser } from "@/services/auth.services";
import { useRouter } from "next/navigation";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const DashboardNav = ({ setSidebarOpen, MENU }: any) => {
  const router = useRouter();

  const handleLogOut = () => {
    removeUser();
    // router.refresh();
    router.push("/login");
  };
  return (
    <div className="flex justify-between h-16 lg:h-[90px] shrink-0 items-center gap-x-4  bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <AlignJustify width={24} height={24} />
      </button>

      {/* Separator */}
      <div
        aria-hidden="true"
        className="h-6 w-0 lg:w-px bg-gray-200 lg:hidden"
      />

      <div className="flex flex-1 gap-x-2 self-stretch lg:gap-x-3">
        {/* MENU */}
        <ul className="relative hidden lg:flex flex-1 items-center lg:gap-5 xl:gap-10">
          {MENU?.map((item: any) => (
            <>
              {item?.subMenu ? (
                <Menu as="li" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <div className="flex items-center gap-2">
                      {/* {children} */}
                      <span className="capitalize text-darkGray font-medium text-xs xl:text-sm">
                        {item?.menu}
                      </span>
                      <ChevronDown width={16} height={16} className="text-xs text-darkGray inline-block" />
                    </div>
                  </MenuButton>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 focus:outline-none shadow-md">
                      {item?.subMenu?.map((item: any, index: number) => (
                        <MenuItem key={index}>
                          {({ focus }) => (
                            <Link
                              href={item.href}
                              className={classNames(
                                focus ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                              )}
                            >
                              {item?.menu}
                            </Link>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Transition>
                </Menu>
              ) : (
                <li>
                  <Link
                    href={item?.href}
                    className="capitalize text-darkGray font-medium text-xs xl:text-sm"
                  >
                    {item?.menu}
                  </Link>
                </li>
              )}
            </>
          ))}
        </ul>

        <div className="flex flex-1 lg:flex-none justify-end items-center gap-x-4 xl:gap-x-7 ">
          <button type="button">
            <MessageIcon
              aria-hidden="true"
              className="h-4 xl:h-6 w-4 xl:w-6 text-[#737780] hover:text-darkGray"
            />
          </button>
          <button type="button">
            <NotificationIcon
              aria-hidden="true"
              className="h-4 xl:h-6 w-4 xl:w-6 hover:text-darkGray"
            />
          </button>
          <button type="button">
            <SettingsIcon
              aria-hidden="true"
              className="h-4 xl:h-6 w-4 xl:w-6 text-[#737780] hover:text-darkGray"
            />
          </button>

          {/* Separator */}
          <div aria-hidden="true" className="block h-6 w-px bg-[#D2D3D6]" />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <img
                alt=""
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="w-6 h-6 lg:h-8 lg:w-8 rounded-full bg-gray-50"
              />
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <MenuItem>
                <a
                  href="#"
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                >
                  Your Profile
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  onClick={handleLogOut}
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                >
                  Sign Out
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
