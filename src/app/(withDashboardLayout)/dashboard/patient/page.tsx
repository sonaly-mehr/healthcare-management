import { getUserInfo } from "@/services/auth.services";
import React from "react";

const page = () => {
  const user = getUserInfo();
  console.log("user info", user)


  return (
    <div className=" ">
      <div className="flex mb-8 lg:mb-5">
        <h4 className="text-[#231F20] text-[15px] lg:text-[22px] font-semibold">
        {`Wellcome Back,  👋`}
        {/* ${name} */}
        </h4>
        {/* <span className="text-[#7F828A] font-medium text-[13px] lg:text-base flex items-center gap-[2px] lg:gap-1">
          <Link href="/">Home</Link>{" "}
          <ChevronRight className="text-xl lg:text-[26px]" />{" "}
          <Link href="/user/dashboard">Dashboard</Link>
        </span> */}
      </div>
    </div>
  );
};

export default page;
