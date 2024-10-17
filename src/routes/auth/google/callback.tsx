import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Alert, Spin, Typography } from "antd";
import React, { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { api } from "../../../config/api"; // Ajuste o caminho conforme necessário

const GoogleCallback = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Envia o código para o backend
      api
        .post("/auth/google/token", { code })
        .then((response) => {
          const { token } = response.data;
          // Armazena o token e redireciona para uma página protegida
          secureLocalStorage.setItem("token", token);
        })
        .catch((error) => {
          console.error("Erro ao autenticar:", error);
          setError(
            "Erro ao autenticar com o Google. Por favor, tente novamente.",
          );
        })
        .finally(() => {
          router.navigate({ to: "/users" });
          setLoading(false);
        });
    } else {
      setError("Código de autenticação não encontrado.");
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <Spin tip="Autenticando..." />;
  }

  if (error) {
    return <Alert message="Erro" description={error} type="error" />;
  }

  return <Typography>Redirecionando...</Typography>;
};

export const Route = createFileRoute("/auth/google/callback")({
  component: GoogleCallback,
});
