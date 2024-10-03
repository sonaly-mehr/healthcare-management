import { z } from "zod";

export const validationSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    file: z.any().optional(), // Allow file to be an actual File object
  });
  