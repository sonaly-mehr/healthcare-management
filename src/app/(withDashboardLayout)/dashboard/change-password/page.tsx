'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useChangePasswordMutation } from '@/redux/api/authApi';
import { removeUser } from '@/services/auth.services';
import { KeyRound } from 'lucide-react';
import Form from '@/app/components/ui/Forms/Form';
import InputFeild from '@/app/components/ui/Forms/InputFeild';
import { Button } from '@/components/ui/button';
import { ChangePassswordSchema } from '@/utils/validationSchema';


const ChangePassword = () => {
   const [changePassword, { isLoading }] = useChangePasswordMutation();
   const router = useRouter();

   const handleLogOut = () => {
      removeUser();
      router.refresh();
    };

    
   const onSubmit = async (values: FieldValues) => {
      try {
         const res = await changePassword(values);

         if ('data' in res && res?.data?.status === 200) {
            toast.success('Password Changed Successfully');
            handleLogOut();
         } else {
            throw new Error('Incorrect Old Password');
         }
      } catch (error) {
         toast.error('Incorrect Old Password');
         console.log(error);
      }
   };

   return (
      <div className="px-6 py-4 max-w-xl w-full shadow-lg rounded-lg mx-auto mt-5 bg-white">
         <div className="flex flex-col items-center justify-center">
            <div className="mb-4">
               <KeyRound className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold mb-4 -mt-4">Change password</h2>
         </div>

         <Form
            onSubmit={onSubmit}
            defaultValues={{ oldPassword: '', newPassword: '' }}
            resolver={zodResolver(ChangePassswordSchema)}
         >
            <div className="grid grid-cols-1 gap-0">
               <InputFeild
                  name='oldPassword'
                  type='password'
                  label='Old Password'
                  className="w-full mb-4"
               />
               <InputFeild
                  name='newPassword'
                  type='password'
                  label='New Password'
                  className="w-full mb-4"
               />
            </div>

            <Button
               type="submit"
               className="w-full my-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
            >
               {isLoading ? 'Changing Password...' : 'Change Password'}
            </Button>
         </Form>
      </div>
   );
};

export default ChangePassword;