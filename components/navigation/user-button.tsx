"use client"
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function UserButton({ user }: Session) {
  return <div className="flex gap-2 text-center align-text-bottom">
   <span>
     {user?.name}
    </span>
  <Button variant={'ghost'} onClick={()=>signOut()}>Signout</Button>
  </div>;
}
