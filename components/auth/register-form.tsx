"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { RegisterSchema } from "@/types/register-schema";
import { emailRegister } from "@/server/actions/email-register";
import { useState } from "react";
import FormSuccess from "@/components/auth/form-success";
import FormError from "@/components/auth/form-error";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm({
    defaultValues: { email: "", password: "", name: "" },
    resolver: zodResolver(RegisterSchema),
  });

  function onSubmit(formData: z.infer<typeof RegisterSchema>) {
    execute(formData);
  }

  const { execute, status, reset } = useAction(emailRegister, {
    onSuccess: ({ data }) => {
      if (data?.success) setSuccess(data.success);
      if(data?.error) setError(data.error)
    },
  });

  return (
    <div className="text-start">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Username" {...field}></Input>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email"
                    type="email"
                    {...field}
                  ></Input>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="current-password"
                    placeholder="********"
                    type="password"
                    {...field}
                  ></Input>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSuccess message={success}></FormSuccess>
          <FormError message={error}></FormError>
          <div>
            <Button
              type="submit"
              className={`w-full ${
                status == "executing" ? "animate-pulse" : ""
              }`}
            >
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
