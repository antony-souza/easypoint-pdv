import type { ReactNode } from "react";
import { LogOutIcon } from "../icons/PdvIcons";
import { BrandLockup } from "../brand/BrandLockup";
import "./PdvWorkspaceLayout.css";

type PdvWorkspaceLayoutProps = {
  email: string;
  onSignOut: () => void;
  children: ReactNode;
};

export function PdvWorkspaceLayout({
  email,
  onSignOut,
  children,
}: PdvWorkspaceLayoutProps) {
  const initial = email.charAt(0).toUpperCase() || "O";

  return (
    <div className="workspace-shell">
      <header className="workspace-header">
        <div className="workspace-header__inner">
          <BrandLockup compact className="workspace-brand" />

          <div className="workspace-header__actions">
            <div className="workspace-identity">
              <span className="workspace-avatar">{initial}</span>
              <div>
                <strong>{email}</strong>
                <span>Operador autorizado</span>
              </div>
            </div>

            <button
              className="workspace-signout"
              type="button"
              onClick={onSignOut}
            >
              <LogOutIcon />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="workspace-main">{children}</main>

      <footer className="workspace-footer">
        <span className="workspace-footer__status" />
        <span>Ponto Fácil PDV</span>
        <span className="workspace-footer__separator">•</span>
        <span>Ambiente do caixa</span>
      </footer>
    </div>
  );
}
