import { useMutation } from "react-query";
import { api } from "../../config/api";
import { useAuth } from "../../contexts/useAuth";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

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

  return {
    data,
    error,
    isLoading,
    mutate,
    isSuccess,
    reset,
  };
};
