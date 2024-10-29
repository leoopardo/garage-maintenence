import { useMutation } from "react-query";
import { api } from "../../config/api";
import { useAuth } from "../../contexts/useAuth";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import toast from "react-hot-toast";
import { ToastError } from "@/components/toast.contents";

interface credentialsI {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { setToken } = useAuth();

  const mutation = useMutation<any | null | undefined, unknown, credentialsI>({
    mutationFn: async (body) => {
      const response = await api.post(`/auth/login`, body, {});

      return response.data;
    },
    mutationKey: "login",
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      setToken(mutation.data?.token);
    }
    secureLocalStorage.setItem("token", mutation.data?.token);
    api.defaults.headers.common["Authorization"] =
      `Bearer ${mutation.data?.token}`;
  }, [mutation.isSuccess]);

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (error) {
    toast.custom(
      (t) => <ToastError error={error} t={t} title="Erro ao realizar login" />,
      { position: "top-left", duration: 5000 },
    );
    reset();
  }

  return {
    data,
    error,
    isLoading,
    mutate,
    isSuccess,
    reset,
  };
};
