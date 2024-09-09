"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { message } from "antd";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { SignInSchemaType } from "@/types";
import { SignInSchema } from "@/schemas";
import { setCookie } from "@/lib/helpers";

function SignInForm() {
  const router = useRouter();
  const [passwordIsShown, setPasswordIsShown] = useState<boolean>(false);

  const {
    formState: { errors },
    reset,
    handleSubmit,
    setFocus,
    register,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignInSchemaType) => {
      const res = await fetch("http://localhost:3000/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    onSuccess: (data) => {
      if (data.message) message.error(data.message);
      else {
        reset({
          email: "",
          password: "",
        });
        setCookie("user", JSON.stringify(data));
        router.replace("dashboard");
      }
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  function onSubmit(data: SignInSchemaType) {
    mutate(data);
  }

  function handleShowPassword() {
    setPasswordIsShown((passwordIsShown) => !passwordIsShown);
  }

  return (
    <form
      className="bg-white drop-shadow-md shadow-gray rounded-lg p-8 flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          className="outline outline-1 rounded-lg outline-slate-200 py-1 w-[400px] px-2"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500">{errors.email?.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <div className="outline outline-1 rounded-lg outline-slate-200 py-1 w-[400px] px-2 flex flex-row items-center justify-between">
          <input
            type={`${passwordIsShown ? "text" : "password"}`}
            id="password"
            {...register("password")}
            className="outline-none flex-1"
          />
          <button type="button" onClick={handleShowPassword}>
            {passwordIsShown ? <RxEyeClosed /> : <RxEyeOpen />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500">{errors.password?.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue rounded-lg text-white py-2"
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}

export default SignInForm;
