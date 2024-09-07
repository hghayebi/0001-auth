import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@nextui-org/react";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

interface HeaderProps {
  label: string;
}

export default function Header({ label }: HeaderProps) {
  return (
    <div className="flex w-full flex-col items-center gap-y-3">
      <h1 className={cn("text-3xl", font.className)}>🔐Auth</h1>
      <p className="text-sm text-foreground-600">{label}</p>
    </div>
  );
}
