import { CheckIcon } from "../components/icons/AuthIcons";
import { PdvAuthLayout } from "../components/layout/PdvAuthLayout";
import "./SessionStartedScreen.css";

type SessionStartedScreenProps = {
  email: string;
  onSignOut: () => void;
};

export function SessionStartedScreen({
  email,
  onSignOut,
}: SessionStartedScreenProps) {
  return (
    <PdvAuthLayout>
      <div className="success-state">
        <div className="success-icon">
          <CheckIcon />
        </div>
        <span className="eyebrow">Autenticação concluída</span>
        <h2>Sessão iniciada</h2>
        <p>
          Seu acesso foi validado. O caixa está pronto para continuar a operação.
        </p>

        <div className="session-summary">
          <span className="session-avatar">{email.charAt(0).toUpperCase()}</span>
          <div>
            <strong>{email}</strong>
            <span>Operador autorizado</span>
          </div>
        </div>

        <button className="text-button" type="button" onClick={onSignOut}>
          Encerrar sessão
        </button>
      </div>
    </PdvAuthLayout>
  );
}
