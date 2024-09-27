import React, { useState } from 'react';
import { useGetAllSpecialtiesQuery } from '@/redux/api/specialtiesApi';

const ScrollCategory = ({ specialties, onChange }: { specialties: string; onChange: (specialty: string) => void }) => {
   const { data } = useGetAllSpecialtiesQuery(undefined);
   const [value, setValue] = useState(specialties || '');

   const handleChange = (newValue: string) => {
      setValue(newValue);
      onChange(newValue); // Call the onChange prop to update the parent component
   };

   return (
      <div className="max-w-full mx-auto bg-white">
         <div className="flex overflow-x-auto whitespace-nowrap p-4 space-x-3">
            {/* Default "All" button */}
            <button
               onClick={() => handleChange('')} // Pass empty string to show all
               className={`px-5 py-2 text-sm lg:text-base font-semibold rounded-lg transition-all duration-300 shadow-md 
                  ${value === '' ? 'bg-blue-600 text-white' : 'text-blue-600 bg-white border border-blue-600 hover:bg-blue-100'}`}
            >
               All
            </button>

            {data?.map((specialty: any) => (
               <button
                  key={specialty?.id}
                  onClick={() => handleChange(specialty?.title)}
                  className={`px-5 py-2  text-sm lg:text-base font-semibold rounded-lg transition-all duration-300 shadow-md 
                     ${value === specialty.title ? 'bg-blue-600 text-white' : 'text-blue-600 bg-white border border-blue-600 hover:bg-blue-100'}`}
               >
                  {specialty?.title}
               </button>
            ))}
         </div>
      </div>
   );
};

export default ScrollCategory;