"use client";

import React, { useState, useTransition } from "react";
import CardWrapper from "./card-wrapper";
import paths from "@/paths";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
} from "@heroicons/react/16/solid";
import FormError from "../common/form-error";
import FormSuccess from "../common/form-success";
import actions from "@/actions";

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function LoginForm() {
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
  } = useForm<LoginFormValues>({
    mode: "onTouched",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await actions.login(data);

      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.success);
        setValue("email", "");
        setValue("password", "");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref={paths.register()}
      social
    >
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
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

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          isLoading={isPending}
          size="lg"
          fullWidth
          className="bg-foreground-800 text-background"
        >
          Login
        </Button>
      </form>
    </CardWrapper>
  );
}
