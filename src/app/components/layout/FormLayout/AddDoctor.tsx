"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FieldValues } from "react-hook-form";
import { useCreateDoctorMutation } from "@/redux/api/doctorsApi";
import { modifyPayload } from "@/utils/modifyPayloads";
import { toast } from "sonner";
import InputFeild from "../../ui/Forms/InputFeild";
import Form from "../../ui/Forms/Form";
import { Gender } from "@/types";
import SelecetInput from "../../ui/Forms/SelecetInput";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import Chip from "@/components/ui/chip";
import { DoctorValidation } from "@/utils/validationSchema";


type Specialty = {
  id: string; // or number, based on your data structure
  title: string;
};


const AddDoctor = () => {
  const router = useRouter();
  const { data: specialtiesData } = useGetAllSpecialtiesQuery({});
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [createDoctor] = useCreateDoctorMutation();

  // Handler for selecting specialties
  const handleSelectSpecialty = (specialtyId: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialtyId)
        ? prev.filter((id) => id !== specialtyId)
        : [...prev, specialtyId]
    );
  };

  const handleSubmit = async (values: FieldValues) => {
    values.doctor.experience = Number(values.doctor.experience);
    values.doctor.apointmentFee = Number(values.doctor.apointmentFee);

    const specialties = selectedSpecialties.map((id) => ({
      specialtyId: id, // Adjust based on your actual field name if needed
    }));


    const data = {
      ...values,
      doctor: {
        ...values.doctor,
        doctorSpecialties: specialties // Add selected specialties here
      }
    };
    try {
      const res = await createDoctor(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Doctor created successfully!!!");
        router.push("/dashboard/admin/doctor");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    doctor: {
      email: "",
      name: "",
      contactNumber: "",
      address: "",
      registrationNumber: "",
      gender: "",
      experience: 0,
      apointmentFee: 0,
      qualification: "",
      currentWorkingPlace: "",
      designation: "",
      profilePhoto: "",
    },
    password: "",
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Add Doctor</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-[800px]">
          <DrawerHeader>
            <DrawerTitle>Create Doctor</DrawerTitle>
            <DrawerDescription>
              Add a new doctor to the platform.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 mt-[-15px]">
            <div className="h-full w-full">
              <Form
                onSubmit={handleSubmit}
                defaultValues={defaultValues}
                resolver={zodResolver(DoctorValidation)}
              >
                <div className="">
                  <div className="flex gap-5 flex-wrap">
                    <InputFeild
                      className="flex-1 basis-[48%]"
                      name="doctor.name"
                      label="Name"
                      placeholder="Enter name"
                      // required
                    />
                    <InputFeild
                      className="flex-1 basis-[48%]"
                      type="email"
                      name="doctor.email"
                      label="Email"
                      placeholder="Enter email"
                      // required
                    />
                    <InputFeild
                      className="flex-1 basis-[48%]"
                      type="password"
                      name="password"
                      label="Password"
                      placeholder="Enter password"
                    />
                    <InputFeild
                      className="flex-1 basis-[48%]"
                      name="doctor.contactNumber"
                      label="Contact Number"
                      placeholder="Enter contact number"
                    />
                    <InputFeild
                      className="flex-1 basis-[48%]"
                      name="doctor.address"
                      label="Address"
                      placeholder="Enter address"
                    />
                    <InputFeild
                      className="flex-1 basis-[48%]"
                      name="doctor.registrationNumber"
                      label="Registration Number"
                      placeholder="Enter registration number"
                    />
                    <InputFeild
                      className="flex-1 basis-[48%]"
                      name="doctor.experience"
                      label="Experience(years)"
                      placeholder="Enter experience year"
                    />
                    <SelecetInput
                      items={Gender}
                      className="flex-1 basis-[48%]"
                      name="doctor.gender"
                      label="Gender"
                    />
                    <InputFeild
                      className="flex-1 basis-[48%]"
                      name="doctor.apointmentFee"
                      label="Apointment Fee"
                      placeholder="Enter apointment Fee"
                    />
                    <InputFeild
                      className="flex-1 basis-[48%]"
                      name="doctor.qualification"
                      label="Qualification"
                      placeholder="Enter qualification"
                    />
                    <InputFeild
                      className="flex-1 basis-[48%]"
                      name="doctor.currentWorkingPlace"
                      label="Current Working Place"
                      placeholder="Enter current Working Place"
                    />
                    <InputFeild
                      className="flex-1 basis-[48%]"
                      name="doctor.designation"
                      label="Designation"
                      placeholder="Designation"
                    />
                  </div>

                  {/* Specialties Chip Selector */}
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {specialtiesData?.map((specialty: Specialty) => (
                        <Chip
                          key={specialty?.id}
                          label={specialty?.title}
                          isSelected={selectedSpecialties.includes(
                            specialty?.id
                          )}
                          onSelect={() =>
                            handleSelectSpecialty(specialty?.id)
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <DrawerFooter className="max-w-full mx-auto flex-col gap-3 !p-0 mt-5">
                  <Button type="submit">Create</Button>
                  <DrawerClose asChild>
                    <Button variant="outline" className="text-darkGray">
                      Close
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </Form>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AddDoctor;
