import React from "react";

import CabinTable from "@/components/cabin/CabinTable";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import CreateCabin from "@/components/cabin/CreateCabin";
import FilterCabin from "@/components/cabin/FilterCabin";

function CabinesPage() {
  return (
    <ReactQueryProvider>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-4xl font-semibold text-darkBlue">All cabins</h2>
        <FilterCabin />
      </div>
      <CabinTable />
      <CreateCabin />
    </ReactQueryProvider>
  );
}

export default CabinesPage;
