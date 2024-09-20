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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SpecialtiesTable from "@/app/components/layout/tables/SpecialtiesTable";

export const validationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  file: z.string().optional(),
});

const page = () => {
  const router = useRouter();
  const [createSpecialty] = useCreateSpecialtyMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await createSpecialty(data).unwrap();
      console.log("response", res);
      if (res?.id) {
        console.log("res", res);
        toast.success("Specialty created successfully!!");
        router.refresh();
      }
    } catch (err: any) {
      console.error("error message", err.message);
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
              resolver={zodResolver(validationSchema)}
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
                  // defaultValue=""
                />
                {/* <FileUpload name="file" label="Upload File" /> */}
              </div>
              {/* <DialogFooter> */}
                <Button type="submit" className="w-full">
                  Create
                </Button>
              {/* </DialogFooter> */}
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Table */}
      <SpecialtiesTable />
    </div>
  );
};

export default page;
