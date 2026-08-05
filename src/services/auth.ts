import axios from "axios";
import { invoke } from "@tauri-apps/api/core";

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL ?? "http://localhost:5094"
).replace(/\/+$/, "");

const ACCESS_TOKEN_STORAGE_KEY = "easypoint.pdv.accessToken";

export type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken?: string;
  AccessToken?: string;
};

function getApiErrorMessage(payload: unknown, status: number) {
  if (typeof payload === "object" && payload !== null) {
    const body = payload as Record<string, unknown>;

    if (typeof body.error === "string" && body.error.trim()) {
      return body.error;
    }

    if (typeof body.title === "string" && body.title.trim()) {
      return body.title;
    }

    if (typeof body.errors === "object" && body.errors !== null) {
      const firstError = Object.values(body.errors as Record<string, unknown>)
        .flatMap((value) => (Array.isArray(value) ? value : [value]))
        .find(
          (value): value is string =>
            typeof value === "string" && value.trim().length > 0,
        );

      if (firstError) {
        return firstError;
      }
    }
  }

  if (status === 401) {
    return "E-mail ou senha inválidos.";
  }

  if (status === 0) {
    return "Não foi possível conectar à API. Verifique sua conexão.";
  }

  return "Não foi possível concluir o login. Tente novamente.";
}

async function loginWithBrowser(
  apiUrl: string,
  { email, password }: LoginCredentials,
) {
  try {
    const response = await axios.post<LoginResponse>(
      `${apiUrl}/auth/login`,
      { email, password },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    const accessToken = response.data.accessToken ?? response.data.AccessToken;

    if (!accessToken) {
      throw new Error("A API não retornou um token de acesso.");
    }

    return accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        getApiErrorMessage(error.response?.data, error.response?.status ?? 0),
      );
    }

    throw error;
  }
}

export async function login(
  apiUrl: string,
  credentials: LoginCredentials,
): Promise<string> {
  const normalizedApiUrl = apiUrl.trim().replace(/\/+$/, "");

  if (!normalizedApiUrl) {
    throw new Error("A URL da API não foi configurada.");
  }

  if ("__TAURI_INTERNALS__" in window) {
    return invoke<string>("login", {
      url: normalizedApiUrl,
      email: credentials.email,
      password: credentials.password,
    });
  }

  return loginWithBrowser(normalizedApiUrl, credentials);
}

export function saveAccessToken(accessToken: string) {
  window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
}

export function clearAccessToken() {
  window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}
