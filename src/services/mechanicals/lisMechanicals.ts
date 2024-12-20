import { useQuery } from "react-query";
import { api } from "../../config/api";
import { baseRequestI } from "../__interfaces/baseRequest.interface";
import { baseResponseI } from "../__interfaces/baseResponse.interface";

export interface MechanicalI {
  _id: string;
  firstname: string;
  lastname: string;
  cellphone: string;
  servicesHistory: any[];
  profilePicture?: string;
  profileColor: string;
  createdAt: string;
  updatedAt: string;
}

// Tipo de retorno condicional baseado na presença de params
type MechanicalResponse<T> = T extends undefined
  ? MechanicalI[]
  : baseResponseI<MechanicalI>;

export const useListMechanicals = (params?: baseRequestI) => {
  const { data, error, isLoading, refetch } = useQuery<
    MechanicalResponse<typeof params>
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
