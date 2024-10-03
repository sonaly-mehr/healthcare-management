"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { useState } from "react"; // Import useState to manage success state
import { toast } from "sonner";
import { Check, KeyRound } from "lucide-react";
import Form from "@/app/components/ui/Forms/Form";
import InputFeild from "@/app/components/ui/Forms/InputFeild";
import {ForgotPasswordValidation} from '../../../utils/validationSchema'


const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [isSuccess, setIsSuccess] = useState(false); // Manually manage success state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  const onSubmit = async (values: FieldValues) => {
    try {
       const res = await forgotPassword(values);
       console.log("res in console", res)

       if ('data' in res && res?.data?.status === 200) {
          toast.success('Check Your Email for Reset Link');
          setIsSuccess(true)
       } else if(res?.error){
          toast.error('Something Went Wrong, Try Again');
       }
    } catch (error) {
       console.log(error);
    }
 };


  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="px-4 py-6 max-w-xl w-full shadow-lg rounded-lg bg-white">
        <div className="flex flex-col items-center justify-center mb-4">
          <KeyRound width={40} height={40} className="text-primary" />
          <h1 className="text-xl font-semibold mb-4">Forgot password</h1>
        </div>

        {!isSuccess && (
          <Form
            onSubmit={onSubmit}
            defaultValues={{ email: "" }}
            resolver={zodResolver(ForgotPasswordValidation)}
          >
            <div className="mb-4">
              <InputFeild
                name="email"
                type="email"
                label="Your email"
                className="mb-2 w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Forgot Password
            </button>
          </Form>
        )}

        {/* Display success message when manual success state is true */}
        {isSuccess && !errorMessage && (
          <div className="mb-4">
            <div className="flex items-center text-green-600 bg-green-100 p-4 rounded-md">
              <Check className="mr-2" />
              <span>An Email with reset password link was sent to your email.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;