"use client";

import actions from "@/actions";
import CardWrapper from "@/components/auth/card-wrapper";
import FormError from "@/components/common/form-error";
import FormSuccess from "@/components/common/form-success";
import paths from "@/paths";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { BeatLoader } from "react-spinners";

export default function NewVerificationPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = async (token: string | null) => {
    startTransition(async () => {
      const result = await actions.newVerification(token);
      if (result?.error) {
      }
    });
  };

  useEffect(() => {
    onSubmit(token);
  }, [token]);

  return (
    <CardWrapper
      headerLabel="Verifying email address!"
      backButtonLabel="Back to login?"
      backButtonHref={paths.login()}
    >
      <div className="w-full text-center">
        {!error && !success && <BeatLoader color="purple" />}
      </div>
      <FormError message={error} />
      <FormSuccess message={success} />
    </CardWrapper>
  );
}
