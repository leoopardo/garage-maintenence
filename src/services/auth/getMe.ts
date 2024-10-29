import { useQuery } from "react-query";
import { api } from "../../config/api";

interface Me {
  _id: string;
  name: string;
  role: string;
  status: string;
  email: string;
  tenant: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useGetMe = () => {
  const { data, error, isLoading, refetch } = useQuery<Me | null | undefined>(
    ["Me"],
    async () => {
      const response = await api.get(`/auth/me`);

      return response.data;
    },
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
