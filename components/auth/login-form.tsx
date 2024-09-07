import React from "react";
import CardWrapper from "./card-wrapper";
import paths from "@/paths";

export default function LoginForm() {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref={paths.register()}
      social
    >
      LoginForm
    </CardWrapper>
  );
}
