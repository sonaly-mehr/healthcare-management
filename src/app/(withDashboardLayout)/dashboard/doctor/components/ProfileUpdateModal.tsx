import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter } from '../../../../../components/ui/dialog';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues } from 'react-hook-form';
import { Gender } from '@/types';
import { useGetAllSpecialtiesQuery } from '@/redux/api/specialtiesApi';
import Form from '@/app/components/ui/Forms/Form';
import InputFeild from '@/app/components/ui/Forms/InputFeild';
import SelecetInput from '@/app/components/ui/Forms/SelecetInput';
import MultipleSelectChip from './MultipleSelectChips';
import { useGetDoctorQuery, useUpdateDoctorMutation} from '@/redux/api/doctorsApi';

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const validationSchema = z.object({
  experience: z.coerce.number().int().optional(),
  apointmentFee: z.coerce.number().int().optional(),
  name: z.string().optional(),
  contactNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
  gender: z.string().optional(),
  qualification: z.string().optional(),
  currentWorkingPlace: z.string().optional(),
  designation: z.string().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
  const { data: doctorData, refetch, isSuccess } = useGetDoctorQuery(id);
  const [updateDoctor, { isLoading: updating }] = useUpdateDoctorMutation();
  const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);
  
  const { data: allSpecialties } = useGetAllSpecialtiesQuery(undefined);

  useEffect(() => {
    if (isSuccess) {
      setSelectedSpecialtiesIds(doctorData?.doctorSpecialties.map((sp: any) => sp.specialtiesId));
    }
  }, [isSuccess]);

  const submitHandler = async (values: FieldValues) => {
    const specialties = selectedSpecialtiesIds.map((specialtiesId: string) => ({
      specialtiesId,
      isDeleted: false,
    }));

    const excludedFields: Array<keyof typeof values> = [
      'email',
      'id',
      'role',
      'status',
      'createdAt',
      'updatedAt',
      'isDeleted',
    ];

    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => !excludedFields.includes(key))
    );

    updatedValues.specialties = specialties;

    try {
      await updateDoctor({ body: updatedValues, id });
      await refetch();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>Update Profile</DialogHeader>
        <Form
          onSubmit={submitHandler}
          defaultValues={doctorData}
          resolver={zodResolver(validationSchema)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <InputFeild name="name" label="Name" />
            <InputFeild name="email" label="Email" />
            <InputFeild name="contactNumber" label="Contact Number" />
            <InputFeild name="address" label="Address" />
            <InputFeild name="registrationNumber" label="Registration Number" />
            <InputFeild name="experience" label="Experience" type="number" />
            <SelecetInput name="gender" label="Gender" items={Gender} />
            <InputFeild name="apointmentFee" label="Appointment Fee" type="number" />
            <InputFeild name="qualification" label="Qualification" />
            <InputFeild name="currentWorkingPlace" label="Current Working Place" />
            <InputFeild name="designation" label="Designation" />
            <MultipleSelectChip
              allSpecialties={allSpecialties}
              selectedIds={selectedSpecialtiesIds}
              setSelectedIds={setSelectedSpecialtiesIds}
            />
          </div>
          <DialogFooter>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-500 text-white rounded-md ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={updating}
            >
              Save
            </button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdateModal;