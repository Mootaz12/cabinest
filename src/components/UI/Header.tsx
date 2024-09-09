"use client";
import React from "react";
// import ThemeButton from "./ThemeButton";
import LogoutButton from "./LogoutButton";
import UserButton from "./UserButton";
import ReactQueryProvider from "../providers/ReactQueryProvider";

function Header() {
  return (
    <header>
      <nav className=" bg-white py-3 flex flex-row justify-end pr-14 gap-5 items-center text-lg rounded-bl-md">
        <ReactQueryProvider>
          <UserButton />
        </ReactQueryProvider>
        {/* <ThemeButton /> */}
        <LogoutButton />
      </nav>
    </header>
  );
}

export default Header;
