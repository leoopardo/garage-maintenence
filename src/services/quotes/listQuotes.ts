import { useQuery } from "react-query";
import { api } from "../../config/api";
import { baseRequestI } from "../__interfaces/baseRequest.interface";
import { baseResponseI } from "../__interfaces/baseResponse.interface";
import { userI } from "../users/__interfaces/user.interface";
import { StockI } from "../stock/listStock";
import { StepStatusI } from "../stepsStatus/listStepStatus";

export interface MechanicalI {
  _id: string;
  vehichleId: string;
  clientId: string;
  itens: StockI[];
  steps: StepStatusI[];
  laborCost: number;
  serviceOrderDocument: string;
  status: string;
  responsible: userI;
  createdAt: string;
  updatedAt: string;
  total: number;
}

export const useListQuotes = (params: baseRequestI) => {
  const { data, error, isLoading, refetch } = useQuery<
    baseResponseI<MechanicalI> | null | undefined
  >(["Quotes", params], async () => {
    const response = await api.get("/quotes", {
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
