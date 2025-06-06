import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
// @ts-ignore
import { auth } from "../../../firebase.ts";
import LoginView from "../../view/login/login.tsx";
import Toast from "../../component/Toast"; // Ajuste le chemin si nécessaire

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Utilisateur connecté :", user);
      if (user) {
        setSuccessMessage(`Bienvenue ${user.email}`);
        navigate("/");
      }
    } catch (err: any) {
      console.error("Erreur de connexion :", err.message);
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="container">
      {successMessage && (
        <Toast message={successMessage} onClose={() => setSuccessMessage("")} />
      )}
      <LoginView
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        successMessage={successMessage}
        handleLogin={handleLogin}
      />
    </div>
  );
};

export default Login;
