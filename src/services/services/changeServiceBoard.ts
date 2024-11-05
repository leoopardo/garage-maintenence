import { api } from "@/config/api";
import { useMutation } from "react-query";
import { queryClient } from "../queryClient";

export const useChangeServiceBoard = () => {
  const mutation = useMutation<
    any | null | undefined,
    unknown,
    { serviceId: string; newBoardId: string }
  >({
    mutationFn: async ({ serviceId, newBoardId }) => {
      const response = await api.patch(
        `/services/${serviceId}/change-board/${newBoardId}`,
      );
      queryClient.refetchQueries("Boards");
      return response;
    },
    mutationKey: "createMechanical",
  });
  const { mutate, isLoading, error, reset, isSuccess } = mutation;

  // if (isSuccess) {
  //   toast.success("Mecânico cadastrado com sucesso!", { position: "top-left" });
  //   reset();
  //   setOpen(false);
  // }

  // if (error) {
  //   toast.error("Erro ao cadastrar mecânico!", { position: "top-left" });
  //   reset();
  // }

  return {
    mutate,
    isLoading,
    error,
    isSuccess,
    reset,
  };
};
