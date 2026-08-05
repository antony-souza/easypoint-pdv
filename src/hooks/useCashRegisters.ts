import { useCallback, useEffect, useState } from "react";
import { listCashRegisters, type CashRegister } from "../services/cashRegisters";

function getLoadErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "Não foi possível carregar os caixas. Tente novamente.";
}

export function useCashRegisters() {
  const [cashRegisters, setCashRegisters] = useState<CashRegister[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await listCashRegisters();
      setCashRegisters(response.items);
      setTotalItems(response.totalItems);
    } catch (error) {
      setErrorMessage(getLoadErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    cashRegisters,
    totalItems,
    isLoading,
    errorMessage,
    refresh,
  };
}
