import { useState } from "react";
import { CashRegisterCard } from "../components/cash-register/CashRegisterCard";
import { CashRegisterIcon, RefreshIcon } from "../components/icons/PdvIcons";
import { PdvWorkspaceLayout } from "../components/layout/PdvWorkspaceLayout";
import { useCashRegisters } from "../hooks/useCashRegisters";
import "./CashRegisterSelectionScreen.css";

type CashRegisterSelectionScreenProps = {
  email: string;
  onSignOut: () => void;
};

export function CashRegisterSelectionScreen({
  email,
  onSignOut,
}: CashRegisterSelectionScreenProps) {
  const {
    cashRegisters,
    totalItems,
    isLoading,
    errorMessage,
    refresh,
  } = useCashRegisters();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCashRegister = cashRegisters.find(
    (cashRegister) => cashRegister.id === selectedId,
  );

  return (
    <PdvWorkspaceLayout email={email} onSignOut={onSignOut}>
      <section className="cash-register-selection" aria-live="polite">
        <div className="cash-register-selection__heading">
          <div>
            <span className="eyebrow">Ambiente do caixa</span>
            <h1>Escolha um PDV para começar</h1>
            <p>
              Selecione o caixa em que você vai trabalhar nesta estação.
            </p>
          </div>

          <button
            className="cash-register-refresh"
            type="button"
            onClick={() => void refresh()}
            disabled={isLoading}
          >
            <RefreshIcon />
            Atualizar lista
          </button>
        </div>

        <div className="cash-register-selection__toolbar">
          <span>
            {isLoading
              ? "Carregando caixas..."
              : `${totalItems} ${totalItems === 1 ? "caixa disponível" : "caixas cadastrados"}`}
          </span>
          <span>Loja vinculada ao seu acesso</span>
        </div>

        {errorMessage && (
          <div className="cash-register-feedback cash-register-feedback--error" role="alert">
            <div>
              <strong>Não foi possível carregar os caixas</strong>
              <span>{errorMessage}</span>
            </div>
            <button type="button" onClick={() => void refresh()}>
              Tentar novamente
            </button>
          </div>
        )}

        {!errorMessage && isLoading && (
          <div className="cash-register-grid" aria-label="Carregando caixas">
            {[1, 2, 3].map((item) => (
              <div className="cash-register-skeleton" key={item}>
                <span />
                <span />
                <span />
                <span />
              </div>
            ))}
          </div>
        )}

        {!errorMessage && !isLoading && cashRegisters.length === 0 && (
          <div className="cash-register-empty">
            <span className="cash-register-empty__icon">
              <CashRegisterIcon />
            </span>
            <h2>Nenhum caixa cadastrado</h2>
            <p>
              Ainda não existem caixas vinculados à sua loja. Cadastre um caixa
              no painel administrativo para continuar.
            </p>
            <button type="button" onClick={() => void refresh()}>
              Atualizar lista
            </button>
          </div>
        )}

        {!errorMessage && !isLoading && cashRegisters.length > 0 && (
          <div className="cash-register-grid" role="list">
            {cashRegisters.map((cashRegister) => (
              <CashRegisterCard
                key={cashRegister.id}
                cashRegister={cashRegister}
                isSelected={cashRegister.id === selectedId}
                onSelect={() => setSelectedId(cashRegister.id)}
              />
            ))}
          </div>
        )}

        {selectedCashRegister && (
          <div className="cash-register-selected-summary">
            <span className="cash-register-selected-summary__dot" />
            <div>
              <span>Caixa selecionado</span>
              <strong>
                {selectedCashRegister.name} · {selectedCashRegister.code}
              </strong>
            </div>
            <span className="cash-register-selected-summary__hint">
              Pronto para iniciar a operação
            </span>
          </div>
        )}
      </section>
    </PdvWorkspaceLayout>
  );
}
