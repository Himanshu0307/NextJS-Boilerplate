"use client";
import AuthCard from "@/components/auth/auth-card";
import { EmailVerificationForm } from "@/components/auth/email-verification-form";

export default function EmailVerificationPage() {
 

  return (
    <div>
      <AuthCard
        backTitle="Back to login"
        backhref="/auth/login"
        cardTitle="Verifying E-Mail"
        showSocial={false}
      >
       <EmailVerificationForm  />
      </AuthCard>
    </div>
  );
}
