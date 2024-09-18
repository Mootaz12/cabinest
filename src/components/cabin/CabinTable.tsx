"use client";
import React from "react";
import { Spin } from "antd";

import Table from "../Table";
import { useFetchCabins } from "@/hooks/useFetchCabins";
import { Cabin } from "@/types";
import CabinRow from "./CabinRow";

const CABIN_TABLE_COLS = ["CABIN", "CAPACITY", "PRICE", "DISCOUNT", "ACTIONS"];

function CabinTable() {
  const { isLoading, data: cabins } = useFetchCabins();

  return (
    <Table cols={CABIN_TABLE_COLS}>
      {isLoading ? (
        <Spin />
      ) : (
        cabins?.map((cabin: Cabin) => {
          return <CabinRow key={cabin.cabinId} cabin={cabin} />;
        })
      )}
    </Table>
  );
}

export default CabinTable;
