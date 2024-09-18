import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import { Cabin } from "@/types";
import { useDeleteCabin } from "@/hooks/useDeleteCabin";
import UpdateCabinForm from "./UpdateCabinForm";
import { useDetectClick } from "@/hooks/useDetectClick";

function CabinRow({ cabin }: { cabin: Cabin }) {
  // Toggle the settings dropdown
  const [settingsIsOpen, setSettingsIsOpen] = useState<boolean>(false);
  const settingsRef = useRef<HTMLDivElement | null>(null);

  function handleOpenSettings() {
    setSettingsIsOpen((prev) => !prev);
  }

  // Close settings dropdown when clicking outside
  useDetectClick(settingsRef, settingsIsOpen, setSettingsIsOpen);

  // Delete cabin logic
  const { mutate: deleteCabin } = useDeleteCabin(cabin.cabinId);
  function handleDeleteCabin() {
    deleteCabin();
  }

  // Edit cabin modal logic
  const modalRef = useRef<HTMLDialogElement>(null);

  function handleOpenModal() {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }
  function handleCloseModal() {
    if (modalRef.current) modalRef.current.close();
  }

  return (
    <div
      key={cabin.cabinId}
      role="row"
      className="grid grid-cols-[repeat(5,1fr)] items-center bg-white p-4 border-b-[.5px] border-zinc-400"
    >
      <div className="flex items-center gap-4">
        <Image
          src={cabin.imageUrl ? cabin.imageUrl : ""}
          alt={cabin.cabinName}
          width={100}
          height={100}
          className="rounded-md aspect-square"
        />
        <p className="text-zinc-700 font-bold">{cabin.cabinId}</p>
      </div>

      <p className="text-center text-zinc-700">
        Fits up to {cabin.maxCapacity} guests
      </p>

      <p className="text-center text-zinc-700 font-semibold">
        ${cabin.price.toFixed(2)}
      </p>

      <p className="text-center font-medium text-green">
        {cabin.discount > 0 ? `$${cabin.discount.toFixed(2)}` : "—"}
      </p>

      <div className="flex justify-center relative">
        <button
          type="button"
          className="justify-self-end "
          onClick={handleOpenSettings}
        >
          <IoSettingsOutline className="text-2xl" />
        </button>

        {settingsIsOpen && (
          <div
            ref={settingsRef}
            className="absolute top-8 right-0 flex flex-col gap-1 rounded-md bg-white drop-shadow-lg shadow-zinc-300"
          >
            <button
              type="button"
              className="flex flex-row  items-center gap-2 text-center hover:bg-zinc-300 flex-1 px-5 py-2 "
              onClick={handleOpenModal}
            >
              <MdOutlineEdit /> <p>Edit</p>
            </button>

            <button
              type="button"
              className="flex flex-row items-center gap-2 text-center hover:bg-zinc-300 flex-1 px-5 py-2"
              onClick={handleDeleteCabin}
            >
              <RiDeleteBin6Line /> <p>Delete</p>
            </button>
          </div>
        )}

        <dialog
          ref={modalRef}
          className="relative rounded-lg backdrop:bg-transparent w-1/2"
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded z-10"
          >
            Close
          </button>
          <UpdateCabinForm
            cabinId={cabin.cabinId}
            closeForm={handleCloseModal}
          />
        </dialog>
      </div>
    </div>
  );
}

export default CabinRow;
