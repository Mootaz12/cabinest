import { useQuery } from "@tanstack/react-query";
import { message } from "antd";

export function useFetchUser(userId: string) {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/api/user/${userId}`);
      if (!response.ok) {
        message.error("Network response was not");
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  return { isLoading, user };
}
