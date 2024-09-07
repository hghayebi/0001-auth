import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface BackButtonProps {
  label: string;
  href: string;
}

export default function BackButton({ label, href }: BackButtonProps) {
  return (
    <div className="w-full text-center">
      <Button
        size="sm"
        variant="bordered"
        className="border-none"
        as={Link}
        href={href}
      >
        {label}
      </Button>
    </div>
  );
}
