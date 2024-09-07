import { Button } from "@nextui-org/react";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Social() {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button fullWidth size="lg" variant="bordered">
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button fullWidth size="lg" variant="bordered">
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}
