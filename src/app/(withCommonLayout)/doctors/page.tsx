'use client';

import React, { useState } from 'react';
import { useGetAllDoctorsQuery } from '@/redux/api/doctorsApi';
import ScrollCategory from '@/app/components/ui/ScrollCategory';
import DoctorCard from './components/DoctorCard';
import DashedLine from '@/app/components/ui/DashshedLine';

interface PropType {
   searchParams: { specialties: string };
}

const Doctors = ({ searchParams }: PropType) => {
   // Set up state for specialty
   const [specialty, setSpecialty] = useState<string>(searchParams.specialties || '');

   // Build the query object based on the selected specialty
   const query = {
      specialties: specialty,
   };

   // Fetch doctors based on the selected specialty
   const { data: doctorsData, isLoading } = useGetAllDoctorsQuery(query);

   // Function to update specialty and trigger a refetch
   const handleSpecialtyChange = (newSpecialty: string) => {
      setSpecialty(newSpecialty);
   };

   return (
      <div className="container mx-auto px-4">
         {/* Pass handleSpecialtyChange to ScrollCategory */}
         <ScrollCategory specialties={specialty} onChange={handleSpecialtyChange} />

         <DashedLine />

         <div className="mt-2 p-3 bg-secondary-light grid lg:grid-cols-2 gap-x-4">
            {isLoading && <div>Loading...</div>}

            {doctorsData?.doctors?.map((doctor: any, index: number) => (
               <div key={doctor?.id} className='my-8'>
                  <DoctorCard doctor={doctor} />
                  {index < doctorsData?.doctors?.length - 1 && <DashedLine />}
               </div>
            ))}

            {doctorsData?.doctors?.length === 0 && (
               <div className="text-center mt-4">No Doctor Found With This Specialty</div>
            )}
         </div>
      </div>
   );
};

export default Doctors;