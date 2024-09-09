import React from "react";

function CancelFormButton() {
  return (
    <button
      type="reset"
      className="hover:bg-gray p-3 rounded-md outline-[.5px] outline outline-zinc-200"
    >
      Cancel
    </button>
  );
}

export default CancelFormButton;
