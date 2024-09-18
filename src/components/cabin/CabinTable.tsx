"use client";

import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import Table from "../Table";
import { useFetchCabins } from "@/hooks/useFetchCabins";
import { Cabin } from "@/types";
import CabinRow from "./CabinRow";
import { useSearchParams } from "next/navigation";

const CABIN_TABLE_COLS = ["CABIN", "CAPACITY", "PRICE", "DISCOUNT", "ACTIONS"];

function CabinTable() {
  const { isLoading, data: cabins } = useFetchCabins();
  const params = useSearchParams();
  const [filteredCabins, setFilteredCabins] = useState<Cabin[]>([]);

  useEffect(() => {
    if (cabins) {
      const discountFilter = params.get("discount");

      if (discountFilter === "all" || !params.has("discount")) {
        setFilteredCabins(cabins);
      } else if (discountFilter === "with-discount") {
        setFilteredCabins(cabins.filter((cabin: Cabin) => cabin.discount > 0));
      } else if (discountFilter === "no-discount") {
        setFilteredCabins(
          cabins.filter((cabin: Cabin) => cabin.discount === 0)
        );
      }
    }
  }, [cabins, params]);

  return (
    <div
      className={`flex flex-1 justify-center items-center w-full ${
        isLoading ? "p-10" : ""
      } `}
    >
      {isLoading ? (
        <Spin />
      ) : (
        <Table cols={CABIN_TABLE_COLS}>
          {filteredCabins && filteredCabins.length > 0 ? (
            filteredCabins.map((cabin: Cabin) => (
              <CabinRow key={cabin.cabinId} cabin={cabin} />
            ))
          ) : (
            <p>No cabins available for the selected filter</p>
          )}
        </Table>
      )}
    </div>
  );
}

export default CabinTable;
