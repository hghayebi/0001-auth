"use client";

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Social() {
  const onClick = async (provider: "google" | "github") => {
    await signIn(provider);
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        fullWidth
        size="lg"
        variant="bordered"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        fullWidth
        size="lg"
        variant="bordered"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}
