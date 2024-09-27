"use client";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerDescription,
} from "@/components/ui/drawer";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { Gender } from "@/types";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import Form from "@/app/components/ui/Forms/Form";
import InputFeild from "@/app/components/ui/Forms/InputFeild";
import SelecetInput from "@/app/components/ui/Forms/SelecetInput";
import {
  useGetDoctorQuery,
  useUpdateDoctorMutation,
} from "@/redux/api/doctorsApi";
import { Button } from "@/components/ui/button";
import MultipleSelectChips from "./MultipleSelectChips";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const router = useRouter()
  const { data: doctorData, isSuccess } = useGetDoctorQuery(id);
  const [updateDoctor, { isLoading: updating }] = useUpdateDoctorMutation();
  const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);

  const { data: allSpecialties } = useGetAllSpecialtiesQuery(undefined);

  useEffect(() => {
    if (isSuccess) {
      setSelectedSpecialtiesIds(
        doctorData?.doctorSpecialties.map((sp: any) => sp.specialtiesId) || []
      );
    }
  }, [isSuccess, doctorData]);

  const submitHandler = async (values: FieldValues) => {
    const specialties = selectedSpecialtiesIds.map((specialtiesId: string) => ({
      specialtiesId,
      isDeleted: false,
    }));

    const excludedFields: Array<keyof typeof values> = [
      "email",
      "id",
      "role",
      "status",
      "createdAt",
      "updatedAt",
      "isDeleted",
    ];

    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => !excludedFields.includes(key))
    );

    updatedValues.specialties = specialties;

    try {
      const res = await updateDoctor({ body: updatedValues, id });
      if(res){
        toast.success("Profile updated successfully!")
        router.refresh();
      }
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong!")
      console.error(error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-[800px]">
          <DrawerHeader>
            <DrawerTitle>Update Profile</DrawerTitle>
            <DrawerDescription>Update your details below.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
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
                <InputFeild
                  name="registrationNumber"
                  label="Registration Number"
                />
                <InputFeild
                  name="experience"
                  label="Experience"
                  type="number"
                />
                <SelecetInput name="gender" label="Gender" items={Gender} />
                <InputFeild
                  name="apointmentFee"
                  label="Appointment Fee"
                  type="number"
                />
                <InputFeild name="qualification" label="Qualification" />
                <InputFeild
                  name="currentWorkingPlace"
                  label="Current Working Place"
                />
                {/* Removed the designation input field */}
                {/* <MultipleSelectChips
                  name="designation"
                  items={allSpecialties}
                  label="Designation"
                  // required={true} //
                /> */}
              </div>
              <DrawerFooter className="flex-col gap-3 mt-5">
                <button
                  type="submit"
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                    updating ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={updating}
                >
                  Save
                </button>
                <DrawerClose asChild>
                  <Button variant="outline" className="text-darkGray">
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </Form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileUpdateModal;
