import { QueryClient } from "react-query";
import secureLocalStorage from "react-secure-storage";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError(err: any) {
        console.log(err);
        if (err?.status === 401) {
          secureLocalStorage.removeItem("token");
          console.log("Token inválido, removendo token do localstorage");
        }
      },
    },
  },
});
