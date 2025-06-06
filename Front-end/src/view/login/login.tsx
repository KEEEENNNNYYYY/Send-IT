import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

type LoginViewProps = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string | null;
  successMessage: string;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
};

const LoginView: React.FC<LoginViewProps> = ({
                                               email,
                                               setEmail,
                                               password,
                                               setPassword,
                                               error,
                                               successMessage,
                                               handleLogin,
                                             }) => {
  return (
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Connexion</h2>
          <p className="login-subtitle">Welcom back</p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                  className="form-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="votre@email.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input
                  className="form-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Entrez votre mot de passe"
              />
            </div>

            <button className="submit-button" type="submit">
              Se connecter
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <div className="register-link-container">
            Pas encore de compte ?{" "}
            <Link to="/register" className="register-link">
              Inscris-toi ici
            </Link>
          </div>
        </div>
      </div>
  );
};

export default LoginView;
