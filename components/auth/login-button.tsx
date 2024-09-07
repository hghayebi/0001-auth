import React from "react";

import { Button, ButtonProps } from "@nextui-org/react";
import Link from "next/link";
import paths from "@/paths";

interface LoginButtonProps extends ButtonProps {
  children: React.ReactNode;
  mode?: "redirect" | "modal";
}

export default function LoginButton({
  children,
  mode = "redirect",
  ...rest
}: LoginButtonProps) {
  if (mode === "modal") return <span>TODO: Implement modal here!</span>;
  return (
    <Button as={Link} href={paths.login()} {...rest}>
      {children}
    </Button>
  );
}
