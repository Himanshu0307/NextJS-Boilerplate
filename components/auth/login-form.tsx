"use client";
import { LoginSchema } from "@/types/login-schema";
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
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { emailSignIn } from "@/server/actions/email-signin";

export default function LoginForm() {
  const form = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginSchema),
  });

  function onSubmit(formData: z.infer<typeof LoginSchema>) {
    execute(formData);
  }

  const { execute, status, reset } = useAction(emailSignIn, {
    onSuccess:(data)=>{
      console.log(data)
    }
  });

  return (
    <div className="text-start">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <div>
            <Button variant={"link"} asChild>
              <Link href={"/auth/reset"}>Forget Password</Link>
            </Button>
          </div>
          <div>
            <Button
              type="submit"
              className={`w-full ${
                status == "executing" ? "animate-pulse" : ""
              }`}
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
