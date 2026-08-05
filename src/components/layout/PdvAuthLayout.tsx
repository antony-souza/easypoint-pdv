import type { ReactNode } from "react";
import { BrandLockup } from "../brand/BrandLockup";
import { BrandPanel } from "../brand/BrandPanel";
import "./PdvAuthLayout.css";

type PdvAuthLayoutProps = {
  children: ReactNode;
};

export function PdvAuthLayout({ children }: PdvAuthLayoutProps) {
  return (
    <div className="app-shell">
      <main className="login-layout">
        <BrandPanel />

        <section className="login-card" aria-live="polite">
          <BrandLockup compact className="mobile-brand-lockup" />
          {children}
        </section>
      </main>

      <footer className="app-footer">
        <span>Ponto Fácil PDV</span>
        <span className="footer-separator">•</span>
        <span>Sessão segura</span>
      </footer>
    </div>
  );
}
