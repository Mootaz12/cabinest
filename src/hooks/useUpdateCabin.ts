import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCabin(cabinId: number) {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["cabin", cabinId],
    mutationFn: async (data: FormData) => {
      const res = await fetch(`http://localhost:3001/api/cabin/${cabinId}`, {
        method: "PATCH",
        body: data,
      });
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    onSuccess: (data) => {
      if (data.message) message.error(data.message);
      else {
        message.success("Cabin updated with success");
        queryClient.invalidateQueries({
          queryKey: ["cabin", cabinId],
        });
      }
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
  return { mutate, isPending, isSuccess };
}
