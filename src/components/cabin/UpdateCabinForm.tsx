import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spin } from "antd";

import FormInputWrapper from "../form/FormInputWrapper";
import FormChampWrapper from "../form/FormChampWrapper";
import FormButtonWrapper from "../form/FormButtonWrapper";
import CancelFormButton from "../form/CancelFormButton";
import { Cabin, UpdateCabinSchemaType } from "@/types";
import { UpdateCabinSchema } from "@/schemas";
import FormErrorMessage from "../form/FormErrorMessage";
import ImagePreview from "../UI/ImagePreview";
import { useFetchCabin } from "@/hooks/useFetchCabin";
import { useUpdateCabin } from "@/hooks/useUpdateCabin";

type UpdateCabinFormPropsType = {
  cabinId: number;
  closeForm: () => void;
};

function UpdateCabinForm({ cabinId, closeForm }: UpdateCabinFormPropsType) {
  const {
    data: cabin,
  }: {
    data: Cabin;
  } = useFetchCabin(cabinId);

  const { mutate: UpdateCabin, isPending, isSuccess } = useUpdateCabin(cabinId);

  const [imagePreview, setImagePreview] = useState<string>("");
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<UpdateCabinSchemaType>({
    resolver: zodResolver(UpdateCabinSchema),
  });
  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
      setImagePreview(imagePreviewUrl);
    }
  }
  useEffect(() => {
    setFocus("cabinName");
  }, [setFocus]);
  useEffect(() => {
    if (cabin) {
      reset({
        cabinName: cabin.cabinName,
        maxCapacity: cabin.maxCapacity.toString(),
        regularPrice: cabin.price.toString(),
        discount: cabin.discount.toString(),
        description: cabin.description,
        image: cabin.imageUrl,
      });
    }
  }, [cabin, reset]);
  function onSubmit(data: UpdateCabinSchemaType) {
    const formData = new FormData();
    formData.append("cabinName", data.cabinName);
    formData.append("maxCapacity", data.maxCapacity);
    formData.append("price", data.regularPrice);

    // discount is set to 0 if not provided
    if (data.discount) formData.append("discount", data.discount);
    else formData.append("discount", "0");
    formData.append("description", data.description);
    formData.append("file", data.image[0]);

    UpdateCabin(formData);
    if (isSuccess) closeForm();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 bg-white p-8 border-[.1px] border-zinc-200 rounded-md drop-shadow-sm shadow-gray w-full"
    >
      <FormChampWrapper>
        <FormInputWrapper>
          <label htmlFor="cabinName">Cabin name</label>
          <input
            type="text"
            id="cabinName"
            className="w-1/2 outline-zinc-200 outline outline-[.5px] px-4 py-2 rounded-md focus-within:outline-2 focus-within:outline-blue"
            {...register("cabinName")}
          />
        </FormInputWrapper>
        {errors.cabinName && (
          <FormErrorMessage errorMessage={errors.cabinName.message} />
        )}
      </FormChampWrapper>
      <FormChampWrapper>
        <FormInputWrapper>
          <label htmlFor="maxCapacity">Maximum capacity</label>
          <input
            type="number"
            id="maxCapacity"
            className="w-1/2 outline-zinc-200 outline outline-[.5px] px-4 py-2 rounded-md focus-within:outline-2 focus-within:outline-blue"
            {...register("maxCapacity")}
            min={1}
          />
        </FormInputWrapper>
        {errors.maxCapacity && (
          <FormErrorMessage errorMessage={errors.maxCapacity.message} />
        )}
      </FormChampWrapper>
      <FormChampWrapper>
        <FormInputWrapper>
          <label htmlFor="price">Regular price</label>
          <input
            type="number"
            id="price"
            className="w-1/2 outline-zinc-200 outline outline-[.5px] px-4 py-2 rounded-md focus-within:outline-2 focus-within:outline-blue"
            {...register("regularPrice")}
            min={1}
          />
        </FormInputWrapper>
        {errors.regularPrice && (
          <FormErrorMessage errorMessage={errors.regularPrice.message} />
        )}
      </FormChampWrapper>
      <FormChampWrapper>
        <FormInputWrapper>
          <label htmlFor="discount">Discount</label>
          <input
            type="number"
            id="discount"
            className="w-1/2 outline-zinc-200 outline outline-[.5px] px-4 py-2 rounded-md focus-within:outline-2 focus-within:outline-blue"
            {...register("discount")}
            min={0}
          />
        </FormInputWrapper>
        {errors.discount && (
          <FormErrorMessage errorMessage={errors.discount.message} />
        )}
      </FormChampWrapper>
      <FormChampWrapper>
        <FormInputWrapper>
          <label htmlFor="description">Description </label>
          <textarea
            cols={30}
            rows={2}
            id="description"
            className="w-1/2 outline-zinc-200 outline outline-[.5px] px-4 py-2 rounded-md focus-within:outline-2 focus-within:outline-blue"
            {...register("description")}
          />
        </FormInputWrapper>
        {errors.description && (
          <FormErrorMessage errorMessage={errors.description.message} />
        )}
      </FormChampWrapper>
      <FormChampWrapper>
        <FormInputWrapper>
          <label htmlFor="image">Cabin photo</label>
          <input
            type="file"
            id="image"
            {...register("image")}
            accept="image/*"
            onChange={handleImageChange}
          />
        </FormInputWrapper>
        <ImagePreview imagePreview={imagePreview} />
      </FormChampWrapper>
      <FormButtonWrapper>
        <CancelFormButton />
        <button
          type="submit"
          className="text-white bg-blue hover:bg-indigo-700 p-3 rounded-md "
          disabled={isPending}
        >
          {isPending ? "Updating new Cabin..." : "Update new Cabin"}
        </button>
      </FormButtonWrapper>
    </form>
  );
}

export default UpdateCabinForm;
