import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const ToProfile: React.FC = () => {
    const navigate = useNavigate();

    const handleRedirection = async () => {
        try {
            await signOut(auth);
            navigate("/profil");
        } catch (error) {
            console.error("Erreur de déconnexion :", error);
        }
    };

    return (
        <button onClick={handleRedirection} className="logout-button">
            profil
        </button>
    );
};

export default ToProfile;
