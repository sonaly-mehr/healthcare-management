import React from 'react';

const DoctorInformation = ({ data }: any) => {
   return (
      <>
         {/* Section: Personal Information */}
         <h5 className="text-lg text-primary font-bold mb-4">Personal Information</h5>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
               { label: 'Role', value: data?.role },
               { label: 'Name', value: data?.name },
               { label: 'Email', value: data?.email },
               { label: 'Gender', value: data?.gender },
               { label: 'Designation', value: data?.designation },
            ].map((item, index) => (
               <div
                  key={index}
                  className="bg-blue-50 rounded-lg shadow-sm p-4"
               >
                  <p className="text-[#05C2A9] font-medium">{item.label}</p>
                  <p className="text-gray-700">{item.value || 'N/A'}</p>
               </div>
            ))}
         </div>

         {/* Section: Professional Information */}
         <h5 className="text-lg text-primary font-bold mt-6 mb-4">Professional Information</h5>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
               { label: 'Appointment Fee', value: data?.apointmentFee ? `$${data?.apointmentFee}` : 'N/A' },
               { label: 'Qualification', value: data?.qualification },
               { label: 'Current Working Place', value: data?.currentWorkingPlace || 'N/A' },
               {
                  label: 'Joined',
                  value: data
                     ? new Date(data.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                       })
                     : 'N/A',
               },
               { label: 'Current Status', value: data?.status || 'N/A' },
               { label: 'Average Rating', value: data?.averageRating || 'N/A' },
               { label: 'Experience', value: data?.experience ? `${data?.experience} years` : 'N/A' },
            ].map((item, index) => (
               <div
                  key={index}
                  className="bg-blue-50 rounded-lg shadow-sm p-4"
               >
                  <p className="text-secondary font-medium">{item.label}</p>
                  <p className="text-gray-700">{item.value}</p>
               </div>
            ))}
         </div>
      </>
   );
};

export default DoctorInformation;