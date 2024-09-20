import Image from "next/image";
import React from "react";
import notFound from '../assets/images/not-found.webp'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center text-red-500 text-3xl mt-10">
      <Image src={notFound} alt="" width={600} height={300} className=""/>
      <h1>404!! Page Not Found!!!</h1>
    </div>
  );
};

export default NotFoundPage;