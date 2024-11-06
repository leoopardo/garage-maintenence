import { api } from "@/config/api";
import { baseRequestI } from "@/services/__interfaces/baseRequest.interface";
import { baseResponseI } from "@/services/__interfaces/baseResponse.interface";
import { useQuery } from "react-query";

export interface VehicleI {
  _id: string;
  active: boolean;
  owner: string;
  brand: string;
  carModel: string;
  year: number;
  color: string;
  licensePlate: string;
  kilometers: number;
  servicesHistory: [];
  nextMaintenences: [];
  createdAt: string;
  updatedAt: string;
}

// Tipo de retorno condicional baseado na presença de params
type VehicleResponse<T> = T extends undefined
  ? VehicleI[]
  : baseResponseI<VehicleI>;

export const useListVehicles = (params?: baseRequestI) => {
  const { data, error, isLoading, refetch } = useQuery<
    VehicleResponse<typeof params>
  >(["Vehicles", params], async () => {
    const response = await api.get(`/vehicles`, {
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
