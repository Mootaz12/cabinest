import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("http://localhost:3001/api/cabin", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    onSuccess: (data) => {
      if (data.message) message.error(data.message);
      else {
        message.success("Cabin created with success");
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
      }
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
  return { mutate, isPending, isSuccess };
}
