import React, { PropsWithChildren } from "react";

type TabelTypeProps = PropsWithChildren & {
  cols: string[];
};

function Table({ children, cols }: TabelTypeProps) {
  return (
    <div
      role="table"
      className="rounded-md outline outline-[.5px] outline-zinc-400 w-full"
    >
      <div
        role="row"
        className="bg-lightGray grid grid-cols-[repeat(5,1fr)] gap-4 border-b-[.5px] border-zinc-400 p-4"
      >
        {cols.map((col) => (
          <p key={col} className="text-center font-semibold text-zinc-600">
            {col}
          </p>
        ))}
        <div></div>
      </div>
      <section>{children}</section>
    </div>
  );
}

Table.Footer = function Footer() {
  return (
    <div
      role="row"
      className="text-center font-semibold text-zinc-700 p-4 border-t-[.5px] border-zinc-400"
    >
      This is a footer
    </div>
  );
};

export default Table;
