import React from "react";
import { useNavigate } from "react-router-dom";

const ToProfile: React.FC = () => {
    const navigate = useNavigate();

    const handleRedirection = async () => {
        try {
            navigate("/profil");
        } catch (error) {
            console.error("Erreur de déconnexion :", error);
        }
    };

    return (
        <button onClick={handleRedirection} className="logout-button">
            <img
                src="/profile-user.png"
                alt="Se déconnecter"
                className="logout-icon"
            />
        </button>
    );
};

export default ToProfile;
