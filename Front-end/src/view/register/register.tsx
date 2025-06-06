import React from "react";
import { Link } from "react-router-dom";
import './register.css';

type RegisterViewProps = {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    firstName: string;
    setFirstName: (name: string) => void;
    lastName: string;
    setLastName: (name: string) => void;
    birthday: string;
    setBirthday: (date: string) => void;
    location: string;
    setLocation: (loc: string) => void;
    error: string | null;
    successMessage: string;
    handleRegister: (e: React.FormEvent<HTMLFormElement>) => void;
};

const RegisterView: React.FC<RegisterViewProps> = ({
                                                       email,
                                                       setEmail,
                                                       password,
                                                       setPassword,
                                                       firstName,
                                                       setFirstName,
                                                       lastName,
                                                       setLastName,
                                                       birthday,
                                                       setBirthday,
                                                       location,
                                                       setLocation,
                                                       error,
                                                       successMessage,
                                                       handleRegister,
                                                   }) => {
    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Inscription</h2>
                <p className="register-subtitle">Crée ton compte pour commencer</p>
                <form className="register-form" onSubmit={handleRegister}>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Prénom :</label>
                            <input
                                type="text"
                                className="form-input"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Nom :</label>
                            <input
                                type="text"
                                className="form-input"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Date de naissance :</label>
                            <input
                                type="date"
                                className="form-input"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Ville :</label>
                            <input
                                type="text"
                                className="form-input"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email :</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Mot de passe :</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        S'inscrire
                    </button>
                </form>

                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <div className="login-link-container">
                    Déjà inscrit ?{" "}
                    <Link to="/login" className="login-link">
                        Connecte-toi ici
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default RegisterView;
