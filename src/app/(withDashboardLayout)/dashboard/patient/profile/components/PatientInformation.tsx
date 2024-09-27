import React from 'react';

const PatientInformation = ({ data }: any) => {
   return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
         <h2 className="text-2xl font-bold mb-4 text-gray-800">Patient Information</h2>
         <div className="space-y-3">
            <div className="flex justify-between">
               <span className="font-semibold text-gray-700">Name:</span>
               <span className="text-gray-600">{data?.name}</span>
            </div>
            <div className="flex justify-between">
               <span className="font-semibold text-gray-700">Email:</span>
               <span className="text-gray-600">{data?.email}</span>
            </div>
            <div className="flex justify-between">
               <span className="font-semibold text-gray-700">Contact Number:</span>
               <span className="text-gray-600">{data?.contactNumber}</span>
            </div>
            <div className="flex justify-between">
               <span className="font-semibold text-gray-700">Address:</span>
               <span className="text-gray-600">{data?.address}</span>
            </div>
            <div className="flex justify-between">
               <span className="font-semibold text-gray-700">Status:</span>
               <span className="text-gray-600">{data?.status}</span>
            </div>
            <div className="flex justify-between">
               <span className="font-semibold text-gray-700">Role:</span>
               <span className="text-gray-600">{data?.role}</span>
            </div>
            <div className="flex justify-between">
               <span className="font-semibold text-gray-700">Created At:</span>
               <span className="text-gray-600">{new Date(data?.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
               <span className="font-semibold text-gray-700">Updated At:</span>
               <span className="text-gray-600">{new Date(data?.updatedAt).toLocaleDateString()}</span>
            </div>
         </div>
      </div>
   );
};

export default PatientInformation;