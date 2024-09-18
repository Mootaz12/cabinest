import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInputWrapper from "../form/FormInputWrapper";
import FormChampWrapper from "../form/FormChampWrapper";
import FormButtonWrapper from "../form/FormButtonWrapper";
import CancelFormButton from "../form/CancelFormButton";
import { useCreateCabin } from "@/hooks/useCreateCabin";
import { CreateCabinSchemaType } from "@/types";
import { CreateCabinSchema } from "@/schemas";
import FormErrorMessage from "../form/FormErrorMessage";
import ImagePreview from "../UI/ImagePreview";

type CreateCabinFormPropsType = {
  closeForm: () => void;
};
function CreateCabinForm({ closeForm }: CreateCabinFormPropsType) {
  const { mutate: CreateCabin, isPending, isSuccess } = useCreateCabin();

  const [imagePreview, setImagePreview] = useState<string>("");
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<CreateCabinSchemaType>({
    resolver: zodResolver(CreateCabinSchema),
  });
  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
      setImagePreview(imagePreviewUrl);
    }
  }
  function onSubmit(data: CreateCabinSchemaType) {
    const formData = new FormData();
    formData.append("cabinName", data.cabinName);
    formData.append("maxCapacity", data.maxCapacity);
    formData.append("price", data.regularPrice);

    // discount is set to 0 if not provided
    if (data.discount) formData.append("discount", data.discount);
    else formData.append("discount", "0");
    formData.append("description", data.description);
    formData.append("file", data.image[0]);

    CreateCabin(formData);

    if (isSuccess) closeForm();
  }
  useEffect(() => {
    setFocus("cabinName");
  }, [setFocus]);
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
          {isPending ? "Creating new Cabin..." : "Create new Cabin"}
        </button>
      </FormButtonWrapper>
    </form>
  );
}

export default CreateCabinForm;
