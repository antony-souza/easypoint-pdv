import { useState, type FormEvent } from "react";
import type { LoginCredentials } from "../../services/auth";
import { EyeIcon, LockIcon, MailIcon } from "../icons/AuthIcons";
import "./LoginForm.css";

type LoginFormProps = {
  isLoading: boolean;
  errorMessage: string;
  onClearError: () => void;
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
};

export function LoginForm({
  isLoading,
  errorMessage,
  onClearError,
  onSubmit,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const visibleError = validationMessage || errorMessage;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onClearError();
    setValidationMessage("");

    const normalizedEmail = email.trim();

    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      setValidationMessage("Informe um e-mail válido para continuar.");
      return;
    }

    if (password.length < 6) {
      setValidationMessage("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    await onSubmit({ email: normalizedEmail, password });
  }

  function updateEmail(value: string) {
    setEmail(value);
    setValidationMessage("");
    if (errorMessage || validationMessage) {
      onClearError();
    }
  }

  function updatePassword(value: string) {
    setPassword(value);
    setValidationMessage("");
    if (errorMessage || validationMessage) {
      onClearError();
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="email">E-mail</label>
        <div className="input-wrapper">
          <MailIcon />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="voce@empresa.com"
            value={email}
            onChange={(event) => updateEmail(event.currentTarget.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="password">Senha</label>
        <div className="input-wrapper">
          <LockIcon />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(event) => updatePassword(event.currentTarget.value)}
            disabled={isLoading}
          />
          <button
            className="input-action"
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            title={showPassword ? "Ocultar senha" : "Mostrar senha"}
            disabled={isLoading}
          >
            <EyeIcon visible={showPassword} />
          </button>
        </div>
      </div>

      {visibleError && (
        <div className="form-alert" role="alert">
          <span className="alert-icon">!</span>
          <span>{visibleError}</span>
        </div>
      )}

      <button className="submit-button" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="spinner" />
            Validando acesso...
          </>
        ) : (
          <>
            Entrar no caixa
            <span aria-hidden="true">→</span>
          </>
        )}
      </button>
    </form>
  );
}
