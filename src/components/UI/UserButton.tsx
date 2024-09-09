import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa";

import userImage from "../../../public/logo.png";
import { getCookie } from "@/lib/helpers";
import { useFetchUser } from "@/hooks/useFtechUser";
import { Spin } from "antd";

function UserButton() {
  const router = useRouter();
  const userId = getCookie("user").id;
  const { isLoading, user } = useFetchUser(userId);

  function handleUserNavigation() {
    router.push(`/users/user/${user.id}`);
  }
  if (isLoading) return <Spin />;
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="flex flex-row items-center gap-2">
        <Image src={userImage} alt="username" width={50} height={50} />
        <p>{user.email}</p>
      </div>
      <button>
        <FaRegUser onClick={handleUserNavigation} />
      </button>
    </div>
  );
}

export default dynamic(() => Promise.resolve(UserButton), { ssr: false });
