"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input"
import { formSchema } from "./schema"
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"

export function ContactForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
      service: "seo"
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then(async (response) => {
      if (response.status !== 200 && !response.ok) throw new Error();
      toast.success("Your form is submit successfully.")
    })
      .catch(() => {
        toast.error('Something wrong error')
      })
  }

  return (
    <Form {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input autoComplete="cc-given-name" placeholder="Rajdeep" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the First name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="cc-family-name" placeholder="Singh" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the Last name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} />

        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" placeholder="me@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Enter your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )} />

        <FormField
          control={form.control}
          name="username"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="official_r_deep" {...field} />
              </FormControl>
              <FormDescription>
                Enter your user name.
              </FormDescription>
              <FormMessage />
            </FormItem>)} />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea id="message" placeholder="Your message..." rows={4} {...field} />
              </FormControl>
              <FormDescription>
                Enter your message.
              </FormDescription>
              <FormMessage />
            </FormItem>)} />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" autoComplete="tel" placeholder="+1 (555) 555-5555" {...field} />
              </FormControl>
              <FormDescription>
                Enter your phone number.
              </FormDescription>
              <FormMessage />
            </FormItem>)} />


        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Services</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue {...field} placeholder="Select Services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-design">Web Design</SelectItem>
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="seo">SEO</SelectItem>
                  <SelectItem value="branding">Branding</SelectItem>
                  <SelectItem value="social-media">Social Media</SelectItem>
                </SelectContent>
              </Select>

              <FormDescription>
                Select your service.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-12" type="submit"> Submit </Button>
      </form>
    </Form>
  )
}
