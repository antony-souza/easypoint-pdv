import { useCallback, useState } from "react";
import {
  API_BASE_URL,
  clearAccessToken,
  login,
  saveAccessToken,
  type LoginCredentials,
} from "../services/auth";

export type AuthSession = {
  email: string;
};

function getLoginErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Não foi possível concluir o login. Tente novamente.";
}

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = useCallback(async (credentials: LoginCredentials) => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const accessToken = await login(API_BASE_URL, credentials);
      saveAccessToken(accessToken);
      setSession({ email: credentials.email });
    } catch (error) {
      setErrorMessage(getLoginErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    clearAccessToken();
    setSession(null);
    setErrorMessage("");
  }, []);

  const clearError = useCallback(() => {
    setErrorMessage("");
  }, []);

  return {
    session,
    isLoading,
    errorMessage,
    signIn,
    signOut,
    clearError,
  };
}
