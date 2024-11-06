import { api } from "@/config/api";
import { useMutation } from "react-query";
import { queryClient } from "../queryClient";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

export interface CreateClientI {
  name: string;
  cellphone: string;
}

export const useCreateClient = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const mutation = useMutation<any | null | undefined, unknown, CreateClientI>({
    mutationFn: async (data) => {
      const response = await api.post("/clients", data);
      queryClient.refetchQueries("clients");
      return response;
    },
    mutationKey: "createClient",
  });
  const { mutate, isLoading, error, reset, isSuccess } = mutation;

  if (isSuccess) {
    toast.success("Cliente cadastrado com sucesso!", { position: "top-left" });
    reset();
    setOpen(false);
  }

  if (error) {
    toast.error("Erro ao cadastrar Cliente!", { position: "top-left" });
    reset();
  }

  return {
    mutate,
    isLoading,
    error,
    isSuccess,
    reset,
  };
};
