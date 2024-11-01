import { api } from "@/config/api";
import { useMutation } from "react-query";
import { queryClient } from "../queryClient";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

export interface CreateMechanicalI {
  firstname: string;
  lastname: string;
  cellphone: string;
}

export const useCreateMechanical = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const mutation = useMutation<
    any | null | undefined,
    unknown,
    CreateMechanicalI
  >({
    mutationFn: async (data) => {
      const response = await api.post("/mechanicals", data);
      queryClient.refetchQueries("Mechanicals");
      return response;
    },
    mutationKey: "createMechanical",
  });
  const { mutate, isLoading, error, reset, isSuccess } = mutation;

  if (isSuccess) {
    toast.success("Mecânico cadastrado com sucesso!", { position: "top-left" });
    reset();
    setOpen(false);
  }

  if (error) {
    toast.error("Erro ao cadastrar mecânico!", { position: "top-left" });
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
