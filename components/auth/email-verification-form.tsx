"use client";
import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";
import { handlenNewTokenVerification } from "@/server/actions/token-verification";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
const handleEmailVerification = async (token: string) => {
  const res = await handlenNewTokenVerification(token);
  if (res.error) {
    return { error: res.error };
  }
  if (res.success) {
    return { success: res.success };
  }
};

export const EmailVerificationForm = () => {
  var token = useSearchParams().get("token");
  var router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleTokenVerification = useCallback(() => {
    if (!token) {
      return setError("No Token Found");
    }
    handlenNewTokenVerification(token).then((x) => {
      if (x.error) {
        setError(x.error);
      } else if (x.success) {
        setSuccess(x.success);
        router.push("/auth/login");
      }
    });
  }, [token]);
  useEffect(() => {
    handleTokenVerification();
  }, [handleTokenVerification]);

  return (
    <div>
      <FormSuccess message={success} />
      <FormError message={error} />
      {!error && !success ? (
        <div>
          Please wait while we are verifying your mail
          <span className="animate-accordion-up">...</span>
        </div>
      ) : null}
    </div>
  );
};
