"use client";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useState } from "react";
import Form from "../components/ui/Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFeild from "../components/ui/Forms/InputFeild";
import { userLogin } from "@/services/auth/userLogin";
import { getUserInfo } from "@/services/auth.services";

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);

      if (res?.data?.accessToken) {
        toast.success("Login successful");

        // Get user info (role) from the token or another service
        const { role } = getUserInfo();

        // Check if the role is either "admin" or "doctor"
        if (role === "admin" || role === "doctor") {
          if (res.data?.needPasswordChange) {
            router.push("/dashboard/change-password");
          } else {
            router.push("/dashboard");
          }
        }
        else{
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred during login");
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <div className="max-w-lg w-full shadow-lg rounded-lg p-8 text-center">
        <div className="flex flex-col items-center justify-center mb-4">
          <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
          <h2 className="text-xl font-semibold mt-2">Health Care</h2>
        </div>

        <Form
          onSubmit={handleLogin}
          resolver={zodResolver(validationSchema)}
          defaultValues={{
            email: "",
            password: "",
          }}
        >
          <div className="flex flex-col justify-center items-center gap-3">
            <InputFeild
              name="email"
              placeholder="Email"
              type="email"
              label="Email"
            />
            <InputFeild
              name="password"
              placeholder="Password"
              type="password"
              label="Password"
            />
          </div>

          <Link
            href="/forgot-password"
            className="flex justify-end mt-1 cursor-pointer text-sm font-light hover:text-primary"
          >
            Forgot Password?
          </Link>

          <Button type="submit" className="btn btn-primary w-full my-5">
            Login
          </Button>

          <p className="text-sm font-light">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500">
              Create an account
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
