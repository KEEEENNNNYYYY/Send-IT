import React from "react";
import { Link } from "react-router-dom";

type LoginView = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string | null;
  successMessage: string;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
};

const DumbLogin: React.FC<LoginView> = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  successMessage,
  handleLogin,
}) => {
  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>

      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <p style={{ marginTop: "1rem" }}>
        Pas encore de compte ?{" "}
        <Link to="/register" style={{ color: "#007bff", textDecoration: "underline" }}>
          Inscris-toi ici
        </Link>
      </p>
    </div>
  );
};

export default DumbLogin;
