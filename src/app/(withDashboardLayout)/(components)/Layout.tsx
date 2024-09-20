"use client";

import { USER_MENU } from "@/constants";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardNav from "./DashboardNav";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const MENU = USER_MENU;

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && (
        <div>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="lg:pl-64">
            {/* NAVBAR */}
            <DashboardNav setSidebarOpen={setSidebarOpen} MENU={MENU} />

            <main className="py-7 lg:py-9 bg-[#F9F9F9] min-h-screen">
              <div className="px-4 sm:px-6 lg:px-7">{children}</div>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
