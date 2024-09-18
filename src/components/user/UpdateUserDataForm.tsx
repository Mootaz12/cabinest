"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Spin } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CancelFormButton from "../form/CancelFormButton";
import FormButtonWrapper from "../form/FormButtonWrapper";
import FormInputWrapper from "../form/FormInputWrapper";
import FormChampWrapper from "../form/FormChampWrapper";
import FormErrorMessage from "../form/FormErrorMessage";
import { UpdateUserSchemaType } from "@/types";
import { UpdateUserSchema } from "@/schemas";
import { useFetchUser } from "@/hooks/useFtechUser";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import ImagePreview from "../UI/ImagePreview";

function UpdateUserDataForm({ userId }: { userId: string }) {
  const { isLoading, user } = useFetchUser(userId);
  const { isPending, mutate } = useUpdateUser(userId);
  const [imagePreview, setImagePreview] = useState<string>("");
  const {
    setFocus,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(UpdateUserSchema),
  });
  function onSubmit(data: UpdateUserSchemaType) {
    console.log(data);

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("file", data.image[0]);
    formData.append("password", data.password);

    mutate(formData);
  }
  useEffect(() => {
    user &&
      reset({
        email: user.email,
        fullName: user.fullName,
      });
  }, [reset, user]);
  useEffect(() => {
    setFocus("fullName");
  }, [setFocus]);
  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
      setImagePreview(imagePreviewUrl);
    }
  }

  if (isLoading) return <Spin />;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 bg-white p-8 border-[.1px] border-zinc-200 rounded-md drop-shadow-sm shadow-gray w-full"
    >
      <FormChampWrapper>
        <FormInputWrapper>
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            id="email"
            className=" cursor-not-allowed w-1/2 outline-zinc-200 outline outline-[.5px] px-4 py-2 rounded-md focus-within:outline-2 focus-within:outline-blue"
            disabled
            {...register("email")}
          />
        </FormInputWrapper>
      </FormChampWrapper>
      <FormChampWrapper>
        <FormInputWrapper>
          <label htmlFor="fullName">Full name</label>
          <input
            type="text"
            id="fullName"
            className="w-1/2 outline-zinc-200 outline outline-[.5px] px-4 py-2 rounded-md focus-within:outline-2 focus-within:outline-blue"
            {...register("fullName")}
          />
        </FormInputWrapper>
        {errors.fullName && (
          <FormErrorMessage errorMessage={errors.fullName.message} />
        )}
      </FormChampWrapper>
      <FormChampWrapper>
        <FormInputWrapper>
          <label htmlFor="image">Avatar image</label>
          <input
            type="file"
            {...register("image")}
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </FormInputWrapper>
        <ImagePreview imagePreview={imagePreview} />
      </FormChampWrapper>
      <FormChampWrapper>
        <FormInputWrapper>
          <label htmlFor="password">New password (min 8 chars)</label>
          <input
            type="password"
            id="passowrd"
            className="w-1/2 outline-zinc-200 outline outline-[.5px] px-4 py-2 rounded-md focus-within:outline-2 focus-within:outline-blue"
            {...register("password")}
          />
        </FormInputWrapper>
        {errors.password && (
          <FormErrorMessage errorMessage={errors.password.message} />
        )}
      </FormChampWrapper>
      <FormChampWrapper>
        <FormInputWrapper>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            className="w-1/2 outline-zinc-200 outline outline-[.5px] px-4 py-2 rounded-md focus-within:outline-2 focus-within:outline-blue"
            {...register("confirmPassword")}
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
          {isPending ? "Updating account..." : "Update account"}
        </button>
      </FormButtonWrapper>
    </form>
  );
}

export default UpdateUserDataForm;
