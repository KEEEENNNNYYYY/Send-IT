import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './logic/login/login.tsx';
import Dashboard from './logic/dashboard/dashboard.tsx';
import Register from "./logic/register/register.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
