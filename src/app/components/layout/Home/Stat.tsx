"use client";
import CountUp from "react-countup";
const Stats = () => {
  return (
    <div className="container mx-auto mt-28 mb-10">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl my-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 text-center px-5 py-10 gap-4">
          {[
            { count: 180, label: "Expert Doctors" },
            { count: 26, label: "Expert Services" },
            { count: 1000, label: "Happy Patients" },
            { count: 150, label: "Best Award Winners" },
          ].map((stat, index) => (
            <div key={index}>
              <h1 className="text-3xl font-medium text-white">
                <CountUp end={stat.count} enableScrollSpy={true} />+
              </h1>
              <h1 className="text-xl font-medium text-white">{stat.label}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
