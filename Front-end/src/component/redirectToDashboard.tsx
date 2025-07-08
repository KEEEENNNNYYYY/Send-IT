import React from "react";
import { useNavigate } from "react-router-dom";

const ToDashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleRedirection = async () => {
        try {
            navigate("/");
        } catch (error) {
            console.error("Erreur de déconnexion :", error);
        }
    };

    return (
        <button onClick={handleRedirection} className="logout-button">
            <img
                src="/profile-user.png"
                alt="dashboard"
                className="logout-"
            />
        </button>
    );
};

export default ToDashboard;
