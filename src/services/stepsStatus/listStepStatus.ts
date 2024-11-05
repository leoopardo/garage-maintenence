import { useQuery } from "react-query";
import { api } from "../../config/api";
import { baseRequestI } from "../__interfaces/baseRequest.interface";
import { baseResponseI } from "../__interfaces/baseResponse.interface";

export interface StepStatusI {
  _id: string;
  active: boolean;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const useListStepStatus = (params: baseRequestI) => {
  const { data, error, isLoading, refetch } = useQuery<
    baseResponseI<StepStatusI> | null | undefined
  >(["StepStatus", params], async () => {
    const response = await api.get("/service-status", {
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
