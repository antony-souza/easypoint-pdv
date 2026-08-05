import axios from "axios";
import { invoke } from "@tauri-apps/api/core";
import { API_BASE_URL, getAccessToken } from "./auth";

export type CashRegister = {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
};

export type CashRegisterPage = {
  items: CashRegister[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

function getCashRegisterErrorMessage(payload: unknown, status: number) {
  if (typeof payload === "object" && payload !== null) {
    const body = payload as Record<string, unknown>;

    if (typeof body.error === "string" && body.error.trim()) {
      return body.error;
    }

    if (typeof body.title === "string" && body.title.trim()) {
      return body.title;
    }
  }

  if (status === 401) {
    return "Sua sessão expirou. Entre novamente para continuar.";
  }

  if (status === 0) {
    return "Não foi possível conectar à API. Verifique sua conexão.";
  }

  return "Não foi possível carregar os caixas. Tente novamente.";
}

async function listWithBrowser(
  apiUrl: string,
  accessToken: string,
  page: number,
  perPage: number,
) {
  try {
    const response = await axios.get<CashRegisterPage>(
      `${apiUrl}/cash-registers`,
      {
        params: { page, perPage },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        getCashRegisterErrorMessage(
          error.response?.data,
          error.response?.status ?? 0,
        ),
      );
    }

    throw error;
  }
}

export async function listCashRegisters(
  page = 1,
  perPage = 100,
): Promise<CashRegisterPage> {
  const apiUrl = API_BASE_URL.trim().replace(/\/+$/, "");
  const accessToken = getAccessToken();

  if (!apiUrl) {
    throw new Error("A URL da API não foi configurada.");
  }

  if (!accessToken) {
    throw new Error("Sua sessão expirou. Entre novamente para continuar.");
  }

  if ("__TAURI_INTERNALS__" in window) {
    return invoke<CashRegisterPage>("get_cash_registers", {
      url: apiUrl,
      accessToken,
      page,
      perPage,
    });
  }

  return listWithBrowser(apiUrl, accessToken, page, perPage);
}
