import { useQuery } from "react-query";
import { api } from "../../config/api";
import { baseRequestI } from "../__interfaces/baseRequest.interface";
import { baseResponseI } from "../__interfaces/baseResponse.interface";
import { VehicleI } from "./vehicles/listClients";

export interface ClientI {
  _id: string;
  active: boolean;
  name: string;
  cellphone: string;
  vehicles: VehicleI[];
  createdAt: string;
  updatedAt: string;
}

// Tipo de retorno condicional baseado na presença de params
type ClientResponse<T> = T extends undefined
  ? ClientI[]
  : baseResponseI<ClientI>;

export const useListClients = (params?: baseRequestI) => {
  const { data, error, isLoading, refetch } = useQuery<
    ClientResponse<typeof params>
  >(["clients", params], async () => {
    const response = await api.get(`/clients`, {
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
