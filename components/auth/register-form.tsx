"use client";

import React, { useState, useTransition } from "react";
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
import actions from "@/actions";

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await actions.register(data);

      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.success);
        setValue("name", "");
        setValue("email", "");
        setValue("password", "");
      }
    });
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
              isDisabled={isPending}
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
              isDisabled={isPending}
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
              isDisabled={isPending}
              variant="bordered"
              label="Password"
              placeholder="******"
              startContent={<KeyIcon className="w-4" />}
              isInvalid={!!errors?.password}
              errorMessage={errors?.password?.message}
              type={isVisible ? "text" : "password"}
              endContent={
                isVisible ? (
                  <EyeIcon
                    className="w-4 cursor-pointer"
                    onClick={toggleVisibility}
                  />
                ) : (
                  <EyeSlashIcon
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
              isDisabled={isPending}
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

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          isLoading={isPending}
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
