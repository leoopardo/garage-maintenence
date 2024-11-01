import toast from "react-hot-toast";
import { QueryClient } from "react-query";
import secureLocalStorage from "react-secure-storage";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      keepPreviousData: true,
      onError(err: any) {
        console.log(err);
        if (err?.status === 401) {
          secureLocalStorage.removeItem("token");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          toast.error("Sessão expirada, faça login novamente.");
        }
      },
    },
  },
});
