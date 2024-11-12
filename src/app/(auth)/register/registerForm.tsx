"use client";


import {registerSchema, RegisterSchema} from "@/app/lib/schemas/RegisterSchema";
import { registerUser } from "@/app/actions/authActions";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input
} from "@nextui-org/react";
import React, { useState } from "react";
import {
  FormProvider,
  useForm,
} from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterForm() {
 const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
 } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (
    data: RegisterSchema
    ) => {
    const result = await registerUser(data);
    if(result.status === 'success') {
      console.log('user registered successfully')
    } else {
      if(Array.isArray(result.error)) {
        result.error.forEach((e: any) => {
          // console.log("e::: ", e);
          const fieldName = e.path.join(".") as
           | "email"
           |"name"
           |"password";
          setError(fieldName, {
            message: e.message
          })
        })
    } else {
      setError("root.serverError", {
       message: result.error,
      })
    }
  }
};

  

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-default">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">
              Register
            </h1>
          </div>
          <p className="text-neutral-500">
            Welcome to GetDating!
          </p>
        </div>
      </CardHeader>
      <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
                <Input
                defaultValue=""
                label="Name"
                variant="bordered"
                {...register("name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                />
                <Input
                defaultValue=""
                label="Email"
                variant="bordered"
                {...register("email")}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                />
                <Input
                defaultValue=""
                label="Password"
                variant="bordered"
                {...register("password")}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                />
              <div className="flex flex-row items-center gap-6">
                <Button
                  isDisabled={!isValid}
                  fullWidth
                  color="default"
                  type="submit"
                >
                    Register
                </Button>
              </div>
            </div>
          </form>
      </CardBody>
    </Card>
  );
}