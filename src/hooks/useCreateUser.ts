import { useMutation } from "@tanstack/react-query";

import { CreateUserSchemaType } from "@/types";
import { message } from "antd";

export function useCreateUser() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["users"],
    mutationFn: async (data: CreateUserSchemaType) => {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    onSuccess: (data) => {
      if (data.message) message.error(data.message);
      else {
        message.success("User created with success");
      }
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
  return { mutate, isPending };
}
