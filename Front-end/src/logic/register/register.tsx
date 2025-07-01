import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import axios from "axios";
import RegisterView from "../../view/register/register.tsx";
import { api_url } from "../../api/chat.ts";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [birthday, setBirthday] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage("");

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const payload = {
                id: user.uid,
                first_name: firstName,
                last_name: lastName,
                email:email,
                birthday,
                location,
            };

            await axios.post(api_url+"/api/users", payload);

            setSuccessMessage(`Bienvenue ${firstName}, votre compte a été créé.`);
            navigate("/");
        } catch (err: any) {
            console.error("Erreur d'inscription :", err.message);
            setError("Erreur lors de la création du compte. Vérifiez les champs.");
        }
    };

    return (
        <div className="container">
            <RegisterView
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                birthday={birthday}
                setBirthday={setBirthday}
                location={location}
                setLocation={setLocation}
                error={error}
                successMessage={successMessage}
                handleRegister={handleRegister}
            />
        </div>
    );
};

export default Register;
