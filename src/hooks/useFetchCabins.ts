import { message } from "antd";
import { useQuery } from "@tanstack/react-query";

export function useFetchCabins() {
  const { isLoading, data } = useQuery({
    queryKey: ["cabins"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/api/cabin", {
        method: "GET",
      });
      if (!res.ok) {
        message.error("Error fetching cabins");
        throw new Error("Error fetching cabins");
      }

      return res.json();
    },
  });
  return { isLoading, data };
}
