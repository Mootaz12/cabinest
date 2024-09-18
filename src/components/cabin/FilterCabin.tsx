"use client";

import React, { useState } from "react";
import { CabinFilterType } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";

function FilterCabin() {
  const [selectedButton, setSelectedButton] = useState<CabinFilterType>("all");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterChange = (filter: CabinFilterType) => {
    setSelectedButton(filter);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("discount", filter);

    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex gap-2 bg-white drop-shadow-md shadow-zinc-300 p-2 rounded-md flex-row">
      <button
        type="button"
        className={`hover:bg-blue px-2 py-1 ${
          selectedButton === "all"
            ? "bg-blue cursor-not-allowed text-white"
            : "text-black"
        } ease-in-out transition-all hover:text-white rounded-md`}
        onClick={() => handleFilterChange("all")}
      >
        All
      </button>
      <button
        type="button"
        className={`hover:bg-blue px-2 py-1 ${
          selectedButton === "no-discount"
            ? "bg-blue cursor-not-allowed text-white"
            : "text-black"
        } ease-in-out transition-all hover:text-white rounded-md`}
        onClick={() => handleFilterChange("no-discount")}
      >
        No discount
      </button>
      <button
        type="button"
        className={`hover:bg-blue px-2 py-1 ${
          selectedButton === "with-discount"
            ? "bg-blue cursor-not-allowed text-white"
            : "text-black"
        } ease-in-out transition-all hover:text-white rounded-md`}
        onClick={() => handleFilterChange("with-discount")}
      >
        With discount
      </button>
    </div>
  );
}

export default FilterCabin;
