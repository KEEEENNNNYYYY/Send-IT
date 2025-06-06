import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./ComponentCSS/logout.css";

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Erreur de déconnexion :", error);
        }
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            <img
                src="/logout.png"
                alt="Se déconnecter"
                className="logout-icon"
            />
        </button>
    );
};

export default LogoutButton;
