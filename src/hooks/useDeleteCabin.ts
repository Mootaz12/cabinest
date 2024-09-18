import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export function useDeleteCabin(cabinId: number) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:3001/api/cabin/${cabinId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Error Deleting cabin");
      return response.json();
    },
    onSuccess: () => {
      message.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: () => message.error("There was an error deleting cabin"),
  });
  return { mutate };
}
