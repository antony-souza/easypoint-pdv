import { LoginScreen } from "./screens/LoginScreen";
import { CashRegisterSelectionScreen } from "./screens/CashRegisterSelectionScreen";
import { useAuth } from "./hooks/useAuth";
import "./styles/global.css";

function App() {
  const {
    session,
    isLoading,
    errorMessage,
    signIn,
    signOut,
    clearError,
  } = useAuth();

  if (session) {
    return (
      <CashRegisterSelectionScreen email={session.email} onSignOut={signOut} />
    );
  }

  return (
    <LoginScreen
      isLoading={isLoading}
      errorMessage={errorMessage}
      onClearError={clearError}
      onSubmit={signIn}
    />
  );
}

export default App;
