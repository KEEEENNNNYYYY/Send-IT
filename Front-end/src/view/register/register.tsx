import React from "react";
import { Link } from "react-router-dom";

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
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Prénom :</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div>
                    <label>Nom :</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div>
                    <label>Date de naissance :</label>
                    <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
                </div>
                <div>
                    <label>Ville :</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <div>
                    <label>Email :</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Mot de passe :</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">S'inscrire</button>
            </form>

            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}

            <p style={{ marginTop: "1rem" }}>
                Déjà inscrit ?{" "}
                <Link to="/login" style={{ color: "#007bff", textDecoration: "underline" }}>
                    Connecte-toi ici
                </Link>
            </p>
        </div>
    );
};

export default RegisterView;
