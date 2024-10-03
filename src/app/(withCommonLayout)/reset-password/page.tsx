'use client';  // Ensure this component runs on the client

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { useResetPasswordMutation } from '@/redux/api/authApi';
import { useEffect, Suspense } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { authKey } from '@/constants/authkey';
import { removeUser } from '@/services/auth.services';
import { KeyRound } from 'lucide-react';
import Form from '@/app/components/ui/Forms/Form';
import InputFeild from '@/app/components/ui/Forms/InputFeild';
import { ResetPasswordValidation } from '@/utils/validationSchema';

const ResetPassword = () => {
   const searchParams = useSearchParams();
   const id = searchParams.get('id');
   const token = searchParams.get('token');
   console.log({ id, token });
   const router = useRouter();

   const [resetPassword] = useResetPasswordMutation();

   useEffect(() => {
      if (!token) return;
      localStorage.setItem(authKey, token);
   }, [token]);

   const onSubmit = async (values: FieldValues) => {
      console.log(values);
      const updatedData = { ...values, id };

      try {
         const res = await resetPassword(updatedData);

         if ('data' in res && res.data.status === 200) {
            toast.success('Password Reset Successful');
            removeUser();
            router.push('/login');
         } else {
            toast.error('Something Went Wrong, Try Again');
         }
      } catch (error) {
         toast.error('Something Went Wrong, Try Again');
      }
   };

   return (
      <Suspense fallback={<div>Loading...</div>}>
         <div className="px-4 py-2 max-w-lg w-full shadow-md rounded mx-auto mt-8 md:mt-40">
            <div className="flex flex-col items-center justify-center">
               <div className="w-24 h-24 flex items-center justify-center">
                  <KeyRound className="text-primary" style={{ width: '100%', height: '100%' }} />
               </div>
               <h5 className="font-semibold text-lg mb-2">Reset password</h5>
            </div>
            <Form
               onSubmit={onSubmit}
               defaultValues={{ newPassword: '' }}
               resolver={zodResolver(ResetPasswordValidation)}
            >
               <div className="grid">
                  <div className="col-span-12 md:col-span-6">
                     <InputFeild
                        name="newPassword"
                        type="password"
                        label="New Password"
                        className="mb-2"
                     />
                  </div>
               </div>
               <button type="submit" className="w-full my-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
                  Reset Password
               </button>
            </Form>
         </div>
      </Suspense>
   );
};

export default ResetPassword;