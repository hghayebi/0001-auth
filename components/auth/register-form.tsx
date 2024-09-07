"use client";

import React, { useState } from "react";
import CardWrapper from "./card-wrapper";
import paths from "@/paths";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import FormError from "../common/form-error";
import FormSuccess from "../common/form-success";

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormValues>({
    mode: "onTouched",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    console.log(data);
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref={paths.login()}
      social
    >
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              {...field}
              variant="bordered"
              label="Name"
              placeholder="john Doe"
              startContent={<UserIcon className="w-4" />}
              isInvalid={!!errors?.name}
              errorMessage={errors?.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              variant="bordered"
              label="Email"
              placeholder="johndoe@example.com"
              startContent={<EnvelopeIcon className="w-4" />}
              isInvalid={!!errors?.email}
              errorMessage={errors?.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              variant="bordered"
              label="Password"
              placeholder="******"
              startContent={<KeyIcon className="w-4" />}
              isInvalid={!!errors?.password}
              errorMessage={errors?.password?.message}
              type={isVisible ? "text" : "password"}
              endContent={
                isVisible ? (
                  <EyeSlashIcon
                    className="w-4 cursor-pointer"
                    onClick={toggleVisibility}
                  />
                ) : (
                  <EyeIcon
                    className="w-4 cursor-pointer"
                    onClick={toggleVisibility}
                  />
                )
              }
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              {...field}
              variant="bordered"
              label="Confirm password"
              placeholder="******"
              startContent={<KeyIcon className="w-4" />}
              isInvalid={!!errors?.confirmPassword}
              errorMessage={errors?.confirmPassword?.message}
              type={isVisible ? "text" : "password"}
            />
          )}
        />

        <FormError message="Fear is the worst enemy!" />
        <FormSuccess message="Fear is the worst enemy!" />
        <Button
          type="submit"
          size="lg"
          fullWidth
          className="bg-foreground-800 text-background"
        >
          Create account
        </Button>
      </form>
    </CardWrapper>
  );
}
