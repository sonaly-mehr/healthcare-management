'use client'
import DoctorsLists from "@/app/components/layout/tables/DoctorsLists";
import React, { useEffect, useState } from "react";

const page = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, [setDomLoaded]);
  return (
    <>
      {domLoaded && (
        <div className="">
          <DoctorsLists />
        </div>
      )}
    </>
  );
};

export default page;
