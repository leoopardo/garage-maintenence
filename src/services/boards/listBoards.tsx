import { useQuery } from "react-query";
import { api } from "../../config/api";

export interface BoardI {
  _id: string;
  name: string;
  statusColor: string;
  services: any[];
  createdAt: string;
  updatedAt: string;
}

export const useListBoards = () => {
  const { data, error, isLoading, refetch } = useQuery<
    BoardI[] | null | undefined
  >(["Boards"], async () => {
    const response = await api.get("/boards");

    return response.data;
  });

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
