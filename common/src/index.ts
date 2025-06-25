import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(8)
})

export const signinSchema = z.object({
  emai: z.string().email(),
  password: z.string().min(8)
})

export const createBlogSchema = z.object({
  title: z.string(),
  content: z.string()
})

export const updateBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  id: z.number()
})

//type inference in zod
export type  SignupSchema = z.infer<typeof signupSchema>
export type  SigninSchema = z.infer<typeof signinSchema>
export type  createBlogSchema = z.infer<typeof createBlogSchema>

