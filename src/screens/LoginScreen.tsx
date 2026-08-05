import type { LoginCredentials } from "../services/auth";
import { LoginForm } from "../components/auth/LoginForm";
import { LockIcon } from "../components/icons/AuthIcons";
import { PdvAuthLayout } from "../components/layout/PdvAuthLayout";
import "./LoginScreen.css";

type LoginScreenProps = {
  isLoading: boolean;
  errorMessage: string;
  onClearError: () => void;
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
};

export function LoginScreen({
  isLoading,
  errorMessage,
  onClearError,
  onSubmit,
}: LoginScreenProps) {
  return (
    <PdvAuthLayout>
      <div className="card-heading">
        <span className="eyebrow">Acesso ao caixa</span>
        <h2>Iniciar sessão</h2>
        <p>Entre com suas credenciais do Ponto Fácil para acessar o caixa.</p>
      </div>

      <LoginForm
        isLoading={isLoading}
        errorMessage={errorMessage}
        onClearError={onClearError}
        onSubmit={onSubmit}
      />

      <p className="security-note">
        <LockIcon />
        Acesso exclusivo para operadores autorizados.
      </p>
    </PdvAuthLayout>
  );
}
