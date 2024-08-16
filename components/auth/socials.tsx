"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Socials() {
  return (
    <div className="flex gap-5 flex-col w-full">
      <Button className="w-full" variant={'outline'}
        onClick={() => signIn("google", { redirect: false, callbackUrl: "/" })}
      >Sign in with Google</Button>
      <Button variant={'outline'} className="w-full"
        onClick={() => signIn("github", { redirect: false, callbackUrl: "/" })}
      >Sign in with Github</Button>
    </div>
  );
}
