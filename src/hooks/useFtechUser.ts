import { useQuery } from "@tanstack/react-query";

export function useFetchUser(userId: string) {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      console.log("start refetching");

      const response = await fetch(`http://localhost:3001/api/user/${userId}`);
      return response.json();
    },
  });
  return { isLoading, user };
}
