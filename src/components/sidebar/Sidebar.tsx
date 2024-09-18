"use client";

import Logo from "../UI/Logo";
import SidebarLink from "./SidebarLink";
import { sidebarLinks } from "@/constants/links";

function Sidebar() {
  return (
    <aside className=" px-8 py-6 bg-white ">
      <nav className=" flex flex-col gap-y-10 items-center ">
        <Logo />
        <ul className="flex flex-col gap-y-5">
          {sidebarLinks.map((sidebarLink) => (
            <SidebarLink key={sidebarLink.id} sidebarLink={sidebarLink} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
