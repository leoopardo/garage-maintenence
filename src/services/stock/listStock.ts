import { useQuery } from "react-query";
import { api } from "../../config/api";
import { baseRequestI } from "../__interfaces/baseRequest.interface";
import { baseResponseI } from "../__interfaces/baseResponse.interface";

export interface StockI {
  _id: string;
  active: string;
  name: string;
  costPrice: number;
  profitPercent: number;
  quantity: number;
  description: string;
  image: string;
  category: string;
  brand: string;
  createdAt: string;
  updatedAt: string;
  sellingPrice: number;
}

export const useListStock = (params: baseRequestI) => {
  const { data, error, isLoading, refetch } = useQuery<
    baseResponseI<StockI> | null | undefined
  >(["Stock", params], async () => {
    const response = await api.get("/stock", {
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
