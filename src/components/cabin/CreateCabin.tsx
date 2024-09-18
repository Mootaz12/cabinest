"use client";

import React, { useRef } from "react";
import CreateCabinForm from "./CreateCabinForm";

function CreateCabin() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      // Disable scrolling on the body
      document.body.style.overflow = "hidden";
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      // Re-enable scrolling on the body
      document.body.style.overflow = "";
    }
  };

  return (
    <>
      <button
        type="button"
        className="bg-blue px-4 py-3 rounded-md text-white"
        onClick={openDialog}
      >
        Add new cabin
      </button>

      <dialog
        ref={dialogRef}
        className="relative rounded-lg backdrop-blur-2xl w-1/2"
      >
        <button
          onClick={closeDialog}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded z-10"
        >
          Close
        </button>
        <CreateCabinForm closeForm={closeDialog} />
      </dialog>
    </>
  );
}

export default CreateCabin;
