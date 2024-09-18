import { useQuery } from "@tanstack/react-query";
import { message } from "antd";

export function useFetchCabin(cabinId: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["cabin", cabinId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3001/api/cabin/${cabinId}`,
        { method: "GET" }
      );
      if (!response.ok) {
        message.error("Error fetching cabins");
        throw new Error("error fetching cabin");
      }

      return response.json();
    },
  });
  return { data, isLoading };
}
