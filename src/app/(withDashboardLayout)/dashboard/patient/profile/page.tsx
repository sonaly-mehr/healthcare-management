"use client";

 // Adjust API hooks if necessary
import Image from 'next/image';
import React, { useState } from 'react';
import AutoFileUploader from '@/app/components/ui/Forms/AutoFileUploader';
import { CloudUpload, Pencil } from 'lucide-react';
import patientAvatar from '../../../../../assets/icons/patient.png'; // Placeholder for patient photo
import { useGetMYProfileQuery, useUpdateMYProfileMutation } from '@/redux/api/myProfile';
import PatientInformation from './components/PatientInformation';
import ProfileUpdateModal from './components/ProfileUpdateModal';

const PatientProfile = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const { data, isLoading } = useGetMYProfileQuery(undefined); // Fetch patient profile data
   const [updatePatientProfile, { isLoading: updating }] = useUpdateMYProfileMutation();

   const fileUploadHandler = (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('data', JSON.stringify({}));

      updatePatientProfile(formData);
   };

   if (isLoading) {
      return <p className="text-center text-gray-500">Loading...</p>;
   }

   return (
      <>
         <ProfileUpdateModal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            id={data?.id}
         />
         <div className="container mx-auto mt-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
               {/* Profile Photo Section */}
               <div className="col-span-12 md:col-span-4 flex flex-col items-center">
                  <div className="w-full h-full overflow-hidden rounded-lg shadow-lg">
                     <Image
                        height={300}
                        width={400}
                        src={data?.profilePhoto || patientAvatar}
                        alt="User Photo"
                        className="object-cover w-full h-full p-5"
                     />
                  </div>

                  <div className="my-4 w-full">
                     {updating ? (
                        <p className="text-center text-gray-500">Uploading...</p>
                     ) : (
                        <AutoFileUploader
                           name="file"
                           label="Choose Your Profile Photo"
                           icon={<CloudUpload />}
                           onFileUpload={fileUploadHandler}
                           variant="text"
                        />
                     )}
                  </div>

                  <button
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg flex items-center justify-center space-x-2 transition duration-200 ease-in-out transform hover:scale-105"
                     onClick={() => setIsModalOpen(true)}
                  >
                     <Pencil className="w-5 h-5" />
                     <span>Edit Profile</span>
                  </button>
               </div>

               {/* Patient Information Section */}
               <div className="col-span-12 md:col-span-8">
                  <PatientInformation data={data} /> {/* New component to display patient info */}
               </div>
            </div>
         </div>
      </>
   );
};

export default PatientProfile;