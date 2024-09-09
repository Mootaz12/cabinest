"use client";
import React, { useEffect } from "react";
import { Spin } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";

import CancelFormButton from "../UI/wrappers/CancelFormButton";
import FormButtonWrapper from "../UI/wrappers/FormButtonWrapper";
import FormInputWrapper from "../UI/wrappers/FormInputWrapper";
import FormChampWrapper from "../UI/wrappers/FormChampWrapper";
import FormErrorMessage from "../UI/FormErrorMessage";
import { UpdateUserSchemaType } from "@/types";
import { UpdateUserSchema } from "@/schemas";
import { useFetchUser } from "@/hooks/useFtechUser";
import { useUpdateUser } from "@/hooks/useUpdateUser";

function UpdateUserDataForm({ userId }: { userId: string }) {
  const { isLoading, user } = useFetchUser(userId);
  const { isPending, mutate } = useUpdateUser(userId);

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
    const formData = new FormData();
    formData.append("name", data.fullName);
    formData.append("email", data.email);
    formData.append("image", data.image);
    formData.append("password", data.password);
    mutate(data as unknown as FormData);
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
          <input type="file" {...register("image")} id="image" />
          {/* <CldUploadWidget
            options={{ sources: ["local"] }}
            uploadPreset="Cabinest"
            signatureEndpoint={"http://localhost:3000/api/upload-image"}
            onSuccess={async (result, { widget }) => {
              console.log("gg");

              const paramsToSign = {
                timestamp: Math.floor(Date.now() / 1000),
                source: "uw",
              };
              const response = await fetch("/api/upload-image", {
                method: "POST",
                body: JSON.stringify({ paramsToSign }),
              });
              const { signature } = await response.json();
              console.log(signature);
            }}
          >
            {({ open }) => {
              return (
                <button
                  className="text-white bg-blue hover:bg-indigo-700 p-3 rounded-md "
                  onClick={() => open()}
                >
                  Upload image
                </button>
              );
            }}
          </CldUploadWidget> */}
        </FormInputWrapper>
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
          {isPending ? "Updateing account" : "Update account"}
        </button>
      </FormButtonWrapper>
    </form>
  );
}

export default UpdateUserDataForm;
