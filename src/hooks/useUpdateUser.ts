import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

export function useUpdateUser(userId: string) {
  const { mutate, isPending } = useMutation({
    mutationKey: ["user", userId],
    mutationFn: async (data: FormData) => {
      const res = await fetch(
        `http://localhost:3000/api/users/user/${userId}`,
        {
          method: "PATCH",
          // headers: {
          //   "Content-Type": "multipart/form-data", // no need to set it
          // },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    onSuccess: (data) => {
      if (data.message) message.error(data.message);
      else {
        message.success("Account updated with success");
      }
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
  return { mutate, isPending };
}
