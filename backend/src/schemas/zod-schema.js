import { z } from "zod";
// creating object schema
const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast of 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, { message: "Password must be at least of 7 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
});

const signinSchema = z.object({
  // const { email, password } = req.body;
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, { message: "Password must be at least of 7 characters" })
    .max(1024, { message: "Password can't be greater than 1024 characters" }),
});

const updateUserParamsSchema = z.object({
  id: z
    .string() // Assuming it's a string from the params
    .transform((val) => parseInt(val, 10)) // Convert to number
    .refine((id) => !isNaN(id) && id > 0, {
      message: "ID must be a positive integer",
    }),
});

const updateUserBodySchema = z.object({
  name: z.string().min(1, "Name cannot be empty"), // Example user attribute
  email: z.string().email("Invalid email format"), // Another common user attribute
  // You can add more fields as needed
});

export {
  signinSchema,
  signupSchema,
  updateUserParamsSchema,
  updateUserBodySchema,
};
