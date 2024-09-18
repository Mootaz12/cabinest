import React, { useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { Spin } from "antd";

import { getCookie } from "@/lib/helpers";
import { useFetchUser } from "@/hooks/useFtechUser";
import { User } from "@/types";

function UserButton() {
  const router = useRouter();
  const userId = getCookie("user");

  const { isLoading, user }: { isLoading: boolean; user: User } =
    useFetchUser(userId);

  function handleUserNavigation() {
    router.push(`/profile/${userId}`);
  }
  if (isLoading) return <Spin />;
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="flex flex-row items-center gap-2">
        {user.imageUrl && (
          <Image
            src={user.imageUrl}
            alt={user.fullName}
            width={50}
            height={50}
            className="rounded-full aspect-square"
          />
        )}
        <p>{user.fullName}</p>
      </div>
      <button>
        <FaRegUser onClick={handleUserNavigation} />
      </button>
    </div>
  );
}

export default dynamic(() => Promise.resolve(UserButton), { ssr: false });
