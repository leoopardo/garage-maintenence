import { useQuery } from "react-query";
import { api } from "../../config/api";
import { baseRequestI } from "../__interfaces/baseRequest.interface";
import { baseResponseI } from "../__interfaces/baseResponse.interface";

export interface MechanicalI {}

export const useListMechanicals = (params: baseRequestI) => {
  const { data, error, isLoading, refetch } = useQuery<
    baseResponseI<MechanicalI> | null | undefined
  >(["Mechanicals", params], async () => {
    const response = await api.get(`/mechanicals`, {
      params: { ...params },
    });

    return response.data;
  });

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
