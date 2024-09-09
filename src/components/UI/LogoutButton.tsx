import React from "react";
import { MdLogout } from "react-icons/md";

import { removeCookie } from "@/lib/helpers";
import { useRouter } from "next/navigation";
function LogoutButton() {
  const router = useRouter();
  function handleLogout() {
    removeCookie("user");
    router.replace("/sign-in");
  }
  return (
    <button onClick={handleLogout}>
      <MdLogout />
    </button>
  );
}

export default LogoutButton;
