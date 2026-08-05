import { BrandLockup } from "./BrandLockup";
import "./BrandPanel.css";

export function BrandPanel() {
  return (
    <section className="brand-panel" aria-label="Ponto Fácil">
      <BrandLockup />

      <div className="brand-message">
        <span className="eyebrow eyebrow--light">Ponto de venda</span>
        <h1>Seu caixa começa aqui.</h1>
        <p>
          Uma operação simples, rápida e preparada para o ritmo da sua loja.
        </p>
      </div>

      <div className="brand-footer">
        <span className="online-indicator" />
        <span>Ambiente do caixa</span>
      </div>
    </section>
  );
}
