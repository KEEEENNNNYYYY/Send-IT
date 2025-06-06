import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './logic/login/login.tsx';
import Dashboard from './logic/dashboard/dashboard.tsx';
import Register from "./logic/register/register.tsx";
import Profil from "./logic/profil/profil.tsx"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
