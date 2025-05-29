import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import LoginView from "../../view/login/login.tsx";

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
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Erreur de connexion :", err.message);
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="container">
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
