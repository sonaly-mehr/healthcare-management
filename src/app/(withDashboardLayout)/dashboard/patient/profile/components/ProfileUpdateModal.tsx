"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerDescription,
} from "@/components/ui/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import Form from "@/app/components/ui/Forms/Form";
import InputFeild from "@/app/components/ui/Forms/InputFeild";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGetPatientQuery, useUpdatePatientMutation } from "@/redux/api/patientsApi";
import { UpdateProfile } from "@/utils/validationSchema";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};


const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
  const router = useRouter()
  const { data: patientData, isSuccess } = useGetPatientQuery(id);
  console.log("patient",patientData )
  const [updatePatient, { isLoading: updating }] = useUpdatePatientMutation();


  const submitHandler = async (values: FieldValues) => {

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

    try {
      const res = await updatePatient({ body: updatedValues, id });
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
              defaultValues={patientData}
              resolver={zodResolver(UpdateProfile)}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <InputFeild name="name" label="Name" />
                <InputFeild name="contactNumber" label="Contact Number" />
                <InputFeild name="address" label="Address" />
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
