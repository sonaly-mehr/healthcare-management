'use client';

import avatar from '../../../../../assets/images/user-avatar.png';
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from '@/redux/api/myProfile';
import Image from 'next/image';
import React, { useState } from 'react';
import { CloudUpload, Pencil } from 'lucide-react';
import AutoFileUploader from '@/app/components/ui/Forms/AutoFileUploader';
import DoctorInformation from '../components/DoctorInformation';
import ProfileUpdateModal from '../components/ProfileUpdateModal';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetMYProfileQuery({});
  const [updateMYProfile, { isLoading: updating }] = useUpdateMYProfileMutation();

  const fileUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify({}));
    updateMYProfile(formData);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={data?.id}
      />
      <div className="mt-4 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1">
            <div className="h-72 w-full overflow-hidden rounded-lg">
              <Image
                height={300}
                width={400}
                src={data?.profilePhoto || avatar}
                alt='User Photo'
              />
            </div>
            <div className="my-3">
              {updating ? (
                <p>Uploading...</p>
              ) : (
                <AutoFileUploader
                  name='file'
                  label='Choose Your Profile Photo'
                  icon={<CloudUpload />}
                  onFileUpload={fileUploadHandler}
                  variant='text'
                />
              )}
            </div>
            <button
              className="w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
              <Pencil className="ml-2" />
            </button>
          </div>
          <div className="col-span-1 md:col-span-3">
            <DoctorInformation data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;