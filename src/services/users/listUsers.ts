import { useQuery } from "react-query";
import { api, socket } from "../../config/api";
import { baseRequestI } from "../__interfaces/baseRequest.interface";
import { baseResponseI } from "../__interfaces/baseResponse.interface";
import { userI } from "./__interfaces/user.interface";

export const useListUsers = (params: baseRequestI) => {
  const { data, error, isLoading, refetch } = useQuery<
    baseResponseI<userI> | null | undefined
  >(["Users", params], async () => {
    const response = await api.get(`/users`, {
      params: { ...params },
    });

    return response.data;
  });

  if (socket.connected)
    socket.on("notification", (data: any) => {
      console.log("Notificação de products recebida:", data);
      if (data.ns.coll !== "users") return;
      refetch();
    });

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
