import type { CashRegister } from "../../services/cashRegisters";
import { ArrowRightIcon, CashRegisterIcon } from "../icons/PdvIcons";
import "./CashRegisterCard.css";

type CashRegisterCardProps = {
  cashRegister: CashRegister;
  isSelected: boolean;
  onSelect: () => void;
};

export function CashRegisterCard({
  cashRegister,
  isSelected,
  onSelect,
}: CashRegisterCardProps) {
  const statusLabel = cashRegister.isActive ? "Disponível" : "Inativo";

  return (
    <button
      className={`cash-register-card${isSelected ? " is-selected" : ""}${
        cashRegister.isActive ? "" : " is-disabled"
      }`}
      type="button"
      onClick={onSelect}
      disabled={!cashRegister.isActive}
      aria-pressed={isSelected}
    >
      <span className="cash-register-card__topline">
        <span className="cash-register-card__icon">
          <CashRegisterIcon />
        </span>
        <span
          className={`cash-register-card__status${
            cashRegister.isActive ? " is-active" : ""
          }`}
        >
          <span />
          {statusLabel}
        </span>
      </span>

      <span className="cash-register-card__content">
        <span className="cash-register-card__eyebrow">Ponto de venda</span>
        <strong>{cashRegister.name}</strong>
        <span className="cash-register-card__code">
          Código <b>{cashRegister.code}</b>
        </span>
      </span>

      <span className="cash-register-card__footer">
        <span>{isSelected ? "Caixa selecionado" : "Selecionar caixa"}</span>
        <span className="cash-register-card__arrow">
          <ArrowRightIcon />
        </span>
      </span>
    </button>
  );
}
