import { z } from "zod";

export const SpecialtyValidation = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  file: z.any().optional(), // Allow file to be an actual File object
});

export const LoginValidation = z.object({
  email: z.string().email("Please enter a valid email address!"),
});

export const ResetPasswordValidation = z.object({
    newPassword: z.string().min(6, 'Must be at least 6 characters long'),
 });

 export const ChangePassswordSchema = z.object({
    oldPassword: z.string().min(6, 'Must be at least 6 characters long'),
    newPassword: z.string().min(6, 'Must be at least 6 characters long'),
 });

 export const ForgotPasswordValidation = z.object({
    email: z.string().email("Please enter a valid email address!"),
  });

 export const UpdateProfile = z.object({
    experience: z.coerce.number().int().optional(),
    apointmentFee: z.coerce.number().int().optional(),
    name: z.string().optional(),
    contactNumber: z.string().optional(),
    registrationNumber: z.string().optional(),
    gender: z.string().optional(),
    qualification: z.string().optional(),
    currentWorkingPlace: z.string().optional(),
    designation: z.string().optional(),
  });

  export const ProfileModal = z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
  });

  export const AddDoctor = z.object({
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

  export const DoctorValidation = z.object({
    password: z.string().min(6, "Must be at least 6 characters"),
    doctor: AddDoctor,
  });

  export const PatientRegister = z.object({
    name: z.string().min(1, "Please enter your name!"),
    email: z.string().email("Please enter a valid email address!"),
    contactNumber: z
      .string()
      .regex(/^\d{11}$/, "Please provide a valid phone number!"),
    address: z.string().min(1, "Please enter your address!"),
  });

  export const ValidatePatient = z.object({
    password: z.string().min(6, "Must be at least 6 characters"),
    patient: PatientRegister,
  });
