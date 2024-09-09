import { useQuery } from "@tanstack/react-query";

export function useFetchUser(userId: string) {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/users/user/${userId}`
      );
      return response.json();
    },
  });
  return { isLoading, user };
}
