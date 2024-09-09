"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateUserSchemaType } from "@/types";
import { CreateUserSchema } from "@/schemas";
import CancelFormButton from "../UI/wrappers/CancelFormButton";
import FormChampWrapper from "../UI/wrappers/FormChampWrapper";
import FormButtonWrapper from "../UI/wrappers/FormButtonWrapper";
import FormInputWrapper from "../UI/wrappers/FormInputWrapper";
import FormErrorMessage from "../UI/FormErrorMessage";
import { useCreateUser } from "@/hooks/useCreateUser";

function CreateUserForm() {
  const {
    handleSubmit,
    register,
    setFocus,
    formState: { errors },
  } = useForm<CreateUserSchemaType>({
    resolver: zodResolver(CreateUserSchema),
  });
  useEffect(() => {
    setFocus("fullName");
  }, [setFocus]);
  const { mutate, isPending } = useCreateUser();
  function onSubmit(data: CreateUserSchemaType) {
    mutate(data);
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 bg-white p-8 border-[.1px] border-zinc-200 rounded-md drop-shadow-sm shadow-gray w-full"
    >
      <FormChampWrapper>
        <FormInputWrapper>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            {...register("fullName")}
            className="w-1/2 outline-zinc-200 outline outline-[.5px] px-4 py-2 rounded-md focus-within:outline-2 focus-within:outline-blue"
          />
        </FormInputWrapper>
        {errors.fullName && (
          <FormErrorMessage errorMessage={errors.fullName.message} />
        )}
      </FormChampWrapper>
      <FormChampWrapper>
        <FormInputWrapper>
          <label htmlFor="email">Email adress</label>
          <input
            type="text"
            id="email"
            {...register("email")}
            className="w-1/2 outline-zinc-200 outline outline-[.5px] px-4 py-2 rounded-md focus-within:outline-2 focus-within:outline-blue"
          />
        </FormInputWrapper>
        {errors.email && (
          <FormErrorMessage errorMessage={errors.email.message} />
        )}
      </FormChampWrapper>
      <FormChampWrapper className=" border-b-[.5px] border-zinc-200">
        <FormInputWrapper>
          <label htmlFor="password">Password (min 8 characters)</label>
          <input
            type="text"
            id="password"
            {...register("password")}
            className="w-1/2 outline-zinc-200 outline outline-[.5px] px-4 py-2 rounded-md focus-within:outline-2 focus-within:outline-blue"
          />
        </FormInputWrapper>
        {errors.password && (
          <FormErrorMessage errorMessage={errors.password.message} />
        )}
      </FormChampWrapper>
      <FormChampWrapper>
        <FormInputWrapper>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="text"
            id="confirmPassword"
            {...register("confirmPassword")}
            className="w-1/2 outline-zinc-200 outline outline-[.5px] px-4 py-2 rounded-md focus-within:outline-2 focus-within:outline-blue"
          />
        </FormInputWrapper>
        {errors.confirmPassword && (
          <FormErrorMessage errorMessage={errors.confirmPassword.message} />
        )}
      </FormChampWrapper>
      <FormButtonWrapper>
        <CancelFormButton />
        <button
          type="submit"
          className="text-white bg-blue hover:bg-indigo-700 p-3 rounded-md "
          disabled={isPending}
        >
          {isPending ? "Creating new user" : "Create new user"}
        </button>
      </FormButtonWrapper>
    </form>
  );
}

export default CreateUserForm;
