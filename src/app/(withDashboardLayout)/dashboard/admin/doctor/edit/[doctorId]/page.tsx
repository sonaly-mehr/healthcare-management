'use client'
import Form from "@/app/components/ui/Forms/Form";
import InputFeild from "@/app/components/ui/Forms/InputFeild";
import SelecetInput from "@/app/components/ui/Forms/SelecetInput";
import { Button } from "@/components/ui/button";
import {
  useGetDoctorQuery,
  useUpdateDoctorMutation,
} from "@/redux/api/doctorsApi";
import { Gender } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: {
    doctorId: string;
  };
};

const page = ({ params }: TParams) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const router = useRouter();
  const id = params?.doctorId;
  const { data, isLoading } = useGetDoctorQuery(id);
  console.log("doctor data", data?.name)
  const [updateDoctor] = useUpdateDoctorMutation();

  const handleSubmit = async (values: FieldValues) => {
    values.experience = Number(values.experience);
    values.apointmentFee = Number(values.apointmentFee);
    values.id = id;

    try {
      const res = await updateDoctor({ id: values.id, body: values }).unwrap();
      if (res?.id) {
        toast.success("Doctor Updated Successfully!");
        router.push("/dashboard/admin/doctor");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    email: data?.email || "",
    name: data?.name || "",
    contactNumber: data?.contactNumber || "",
    address: data?.address || "",
    registrationNumber: data?.registrationNumber || "",
    gender: data?.gender || "",
    experience: data?.experience || 0,
    apointmentFee: data?.apointmentFee || 0,
    qualification: data?.qualification || "",
    currentWorkingPlace: data?.currentWorkingPlace || "",
    designation: data?.designation || "",
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}  defaultValues={data && defaultValues}>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 flex-wrap">
            <InputFeild
              className="flex-1 basis-[48%]"
              name="name"
              label="Name"
              defaultValue={data?.name}
            />
            <InputFeild
              className="flex-1 basis-[48%]"
              type="email"
              name="email"
              label="Email"
              defaultValue={data?.email}
            />
            <InputFeild
              className="flex-1 basis-[48%]"
              name="contactNumber"
              label="Contact Number"
              defaultValue={data?.contactNumber}
            />
            <InputFeild
              className="flex-1 basis-[48%]"
              name="address"
              label="Address"
              defaultValue={data?.address}
            />
            <InputFeild
              className="flex-1 basis-[48%]"
              name="registrationNumber"
              label="Registration Number"
              defaultValue={data?.registrationNumber}
            />
            <InputFeild
              className="flex-1 basis-[48%]"
              name="experience"
              label="Experience(years)"
              defaultValue={data?.experience}
            />
            <SelecetInput
              items={Gender}
              className="flex-1 basis-[48%]"
              name="gender"
              label="Gender"
              defaultValue={{ label: data?.gender }}
              // defaultValue={data?.gender}
            />
            <InputFeild
              className="flex-1 basis-[48%]"
              name="apointmentFee"
              label="Apointment Fee"
              defaultValue={data?.apointmentFee}
            />
            <InputFeild
              className="flex-1 basis-[48%]"
              name="qualification"
              label="Qualification"
              defaultValue={data?.qualification}
            />
            <InputFeild
              className="flex-1 basis-[48%]"
              name="currentWorkingPlace"
              label="Current Working Place"
              defaultValue={data?.currentWorkingPlace}
            />
            <InputFeild
              className="flex-1 basis-[48%]"
              name="designation"
              label="Designation"
              defaultValue={data?.designation}
            />
          </div>
        </div>
        <div className="flex justify-center w-full mt-6">
        <Button type="submit" className="w-40">Update</Button>
        </div>
      </Form>
    </div>
    );
  };

export default page;
