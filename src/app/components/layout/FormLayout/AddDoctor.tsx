"use client";
import React from "react";
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

export const doctorValidationSchema = z.object({
  name: z.string().min(3, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
  contactNumber: z
    .string()
    .regex(/^\d{11}$/, "Please provide a valid phone number!"),
  gender: z.string().min(1, "Please enter gender!"),
  address: z.string().min(1, "Please enter your address!"),
  registrationNumber: z.string().min(1, "Please enter registration number!"),
  apointmentFee: z.string().min(1, "Please enter apointment fee!"),
  experience: z.string().min(1, "Please enter experience!"),
  qualification: z.string().min(1, "Please enter qualification!"),
  currentWorkingPlace: z.string().min(1, "Please enter current working place!"),
  designation: z.string().min(1, "Please enter designation!"),
});

export const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters"),
  doctor: doctorValidationSchema,
});

const AddDoctor = () => {
  const router = useRouter();
  const [createDoctor] = useCreateDoctorMutation();

  const handleSubmit = async (values: FieldValues) => {
    values.doctor.experience = Number(values.doctor.experience);
    values.doctor.apointmentFee = Number(values.doctor.apointmentFee);

    const data = modifyPayload(values);
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
                resolver={zodResolver(validationSchema)}
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
