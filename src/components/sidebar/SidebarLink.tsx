import { SidebarLinkType } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SidebarLink({ sidebarLink }: { sidebarLink: SidebarLinkType }) {
  const pathname = usePathname();

  return (
    <li
      className={`flex flex-row items-center gap-x-4 px-4 py-2 hover:bg-lightGray w-[250px] ${
        pathname === `${sidebarLink.path}` && "bg-gray text-violet"
      }  rounded-full w-full text-xl`}
    >
      <sidebarLink.icon />
      <Link href={sidebarLink.path} className=" text-black">
        {sidebarLink.title}
      </Link>
    </li>
  );
}

export default SidebarLink;
