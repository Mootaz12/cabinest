import React from "react";

import CabinTable from "@/components/cabin/CabinTable";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import CreateCabin from "@/components/cabin/CreateCabin";

function CabinesPage() {
  return (
    <ReactQueryProvider>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-4xl font-semibold text-darkBlue">All cabins</h2>
        <div>filters</div>
      </div>
      <CabinTable />
      <CreateCabin />
    </ReactQueryProvider>
  );
}

export default CabinesPage;
