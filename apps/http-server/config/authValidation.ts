import {z} from "zod";

export const signupValidation = z.object({
    name: z.string().min(2),
    username: z.string().min(2),
    email: z.email(),
    password: z.string().min(3)
})

export const signinValidation = z.object({
    username: z.string().min(2).optional(),
    email: z.string().email().optional(),
    password: z.string().min(3)
}).refine(
    (data) => data.username || data.email,
    {
      message: "Either email or username is required",
      path: ["email"], 
    }
  );