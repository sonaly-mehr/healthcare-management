"use client";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayloads";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFeild from "../components/ui/Forms/InputFeild";
import Form from "../components/ui/Forms/Form";
import { PatientRegister } from "@/utils/validationSchema";



const page = () => {

  const defaultValues = {
    password: "",
    patient: {
      name: "",
      email: "",
      contactNumber: "",
      address: "",
    },
  };
  
  const router = useRouter();

  const handleSignUP = async (values: FieldValues) => {
    const data = modifyPayload(values);

    try {
      const res = await registerPatient(data);
      if (res?.data?.id) {
        toast.success(res?.message);
        router.push("/login");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <div className="max-w-lg w-full shadow-lg rounded-lg p-8 text-center">
        <div className="flex flex-col items-center mb-4">
          <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
          <h2 className="text-xl font-semibold mt-2">Patient Register</h2>
        </div>
        <Form
          onSubmit={handleSignUP}
          resolver={zodResolver(PatientRegister)}
          defaultValues={defaultValues}
        >
          <div className="flex flex-col justify-center items-center gap-3">
            <InputFeild
              name="patient.name"
              placeholder="Enter your name"
              label="Name"
            />
            <InputFeild
              type="email"
              name="patient.email"
              placeholder="Enter your email"
              label="Email"
            />
            <InputFeild
              type="password"
              name="password"
              placeholder="Enter password"
              label="Password"
            />
            <InputFeild
              name="patient.contactNumber"
              placeholder="Enter Contact Number"
              label="Contact Number"
            />
            <InputFeild
              name="patient.address"
              placeholder="Enter address"
              label="Address"
            />
          </div>
          <Button type="submit" className="btn btn-primary w-full my-5">
            Register
          </Button>
          <p className="text-sm font-light">
            Do you already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default page;
