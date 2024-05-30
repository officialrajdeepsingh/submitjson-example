import { z } from "zod";
import {isMobilePhone} from "validator";

export const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(12,{
    message :"Username does not extend more than 12 characters."
  }),
  firstName: z.string().trim().min(2,{
    message:"First Name must be at least 2 characters."
  }),
  lastName: z.string().min(2, {
    message: "last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Enter the email"
  }).trim().toLowerCase(),
  phoneNumber: z.string({
    message: "Enter mobile number"
  }).min(10,{
    message: "Phone number is short."
  }).max(10,{
      message: "Phone number is big."
  }).refine((phone) => isMobilePhone(phone),{
    message: "Enter vaild mobile number"
  }),
  message: z.string({message: "Enter message"}).min(12, {
    message: "message must be at least 20 characters.",
  }),
  service: z.enum(["web-design", "web-development","seo","social-media","branding"],{
    message: "Select a service"
  })
})
