"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BackButton({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <div>
      <Button variant={'link'} asChild>
        <Link href={href} aria-label={label}>
          {label}
        </Link>
      </Button>
    </div>
  );
}
