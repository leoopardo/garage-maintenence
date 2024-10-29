import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import secureLocalStorage from "react-secure-storage";

interface AuthContextProps {
  setToken: Dispatch<SetStateAction<string | undefined | null>>;
  token?: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | undefined | null>(
    secureLocalStorage.getItem("token")
      ? `${secureLocalStorage.getItem("token")}`
      : null,
  );

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
