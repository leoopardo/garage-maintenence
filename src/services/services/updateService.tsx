import { api } from "@/config/api";
import { useMutation } from "react-query";
import { queryClient } from "../queryClient";
import toast from "react-hot-toast";
import { ToastError } from "@/components/toast.contents";

export interface ServiceI {
  vehichleId?: string;
  clientId?: string;
  itens?: string[];
  steps?: string[];
  laborCost?: number;
  responsible?: string;
  mechanical?: string;
}

export const useUpdateService = () => {
  const mutation = useMutation<
    any | null | undefined,
    unknown,
    { serviceId: string; body: ServiceI }
  >({
    mutationFn: async ({ serviceId, body }) => {
      const response = await api.patch(`/services/${serviceId}`, body);
      queryClient.refetchQueries("Boards");
      return response;
    },
    mutationKey: "updateService",
  });
  const { mutate, isLoading, error, reset, isSuccess } = mutation;

  // if (isSuccess) {
  //   toast.success("Mecânico cadastrado com sucesso!", { position: "top-left" });
  //   reset();
  //   setOpen(false);
  // }

  if (error) {
    toast.custom(
      (t) => <ToastError error={error} t={t} title="Erro ao mudar situação" />,
      { position: "top-right", duration: 5000 },
    );
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
