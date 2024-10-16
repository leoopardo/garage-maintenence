import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import secureLocalStorage from "react-secure-storage";
import { api, socket } from "../config/api"; // Presume-se que o `socket` seja exportado de algum lugar

interface AuthContextProps {
  setToken: Dispatch<SetStateAction<string | undefined | null>>;
  token?: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | undefined | null>(
    secureLocalStorage.getItem("token")
      ? `${secureLocalStorage.getItem("token")}`
      : null
  );

  useEffect(() => {
    if (token) {
      // Definindo o token para autenticação de requisições API
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Conectar ao socket e enviar o token para autenticação
      socket.auth = { token: `Bearer ${token}` };
      socket.connect(); // Inicia a conexão com o backend

      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          console.log("Usuário ausente");

          // Se a aba ou janela perde o foco, envia uma mensagem informando que o usuário está ausente
          socket.emit("user-status", {
            token: `Bearer ${token}`,
            status: "absent",
          });
        } else if (document.visibilityState === "visible") {
          console.log("Usuário online");

          // Se a aba ou janela volta a ter foco, envia uma mensagem informando que o usuário está online
          socket.emit("user-status", {
            token: `Bearer ${token}`,
            status: "online",
          });
        }
      };

      // Adiciona o listener para o evento de mudança de visibilidade da página
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        socket.disconnect();
      };
    }
    if (!token) {
      socket.emit("user:logout", { token: `Bearer ${token}` });
      socket.disconnect();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ setToken, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
