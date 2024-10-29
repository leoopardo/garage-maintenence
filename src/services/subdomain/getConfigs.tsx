import { ToastError } from "@/components/toast.contents";
import moment from "moment";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { api } from "../../config/api";

export interface ConfigI {
  _id: string;
  module: string;
  subdomain: string;
  workshopName: string;
  plan: string;
  nextPaymentDate: string;
  admin: string;
  createdAt: string;
  updatedAt: string;
}

export const useGetConfig = () => {
  const { data, error, isLoading, refetch } = useQuery<
    ConfigI | null | undefined
  >(["Configs"], async () => {
    const response = await api.get("/configs", {});
    const d: ConfigI = response.data[0];
    if (moment(new Date(d.nextPaymentDate || "")).isBefore(new Date())) {
      toast.custom(
        (t) => (
          <ToastError
            error={
              "Atualize seu método de pagamento para continuar utilizando os recursos."
            }
            t={t}
            title="Pagamento pendente!"
          />
        ),
        { position: "top-right", duration: 5000 },
      );
    }

    return d;
  });

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
