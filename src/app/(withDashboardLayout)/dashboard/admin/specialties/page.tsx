"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Form from "@/app/components/ui/Forms/Form";
import { modifyPayload } from "@/utils/modifyPayloads";
import { FieldValues } from "react-hook-form";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { toast } from "sonner";
import InputFeild from "@/app/components/ui/Forms/InputFeild";
import FileUpload from "@/app/components/ui/Forms/FileUpload";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import SpecialtiesTable from "@/app/components/layout/tables/SpecialtiesTable";
import { SpecialtyValidation } from "@/utils/validationSchema";

const Specialties = () => {
  const router = useRouter();
  const [createSpecialty, {isLoading}] = useCreateSpecialtyMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await createSpecialty(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Specialty created successfully!!");
        // setOpen(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };


  return (
    <div className="">
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center">
        <Input className="lg:w-[600px] mt-4 lg:mb-0" placeholder="Search..." />

        <Dialog>
          <DialogTrigger asChild>
            <Button className="">Create Speciality</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Speciality</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <Form
              onSubmit={handleFormSubmit}
              resolver={zodResolver(SpecialtyValidation)}
              defaultValues={{
                title: "",
                file: "",
              }}
            >
              <div className="grid gap-4 py-4">
                <InputFeild
                  name="title"
                  placeholder="Enter Specialty "
                  label="Title"
                />
               <FileUpload name="file" label="Upload File" /> 
              </div>
                <Button type="submit" className="w-full">
                  {isLoading ? 'Creating...' : 'Create'}
                </Button>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Table */}
      <SpecialtiesTable />
    </div>
  );
};

export default Specialties;
