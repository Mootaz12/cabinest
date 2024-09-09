import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export function useUpdateUser(userId: string) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["user", userId],
    mutationFn: async (data: FormData) => {
      const res = await fetch(`http://localhost:3001/api/user/${userId}`, {
        method: "PATCH",
        body: data,
      });
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    onSuccess: (data) => {
      if (data.message) message.error(data.message);
      else {
        message.success("Account updated with success");
        queryClient.invalidateQueries({
          queryKey: ["user", userId],
        });
      }
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
  return { mutate, isPending };
}
