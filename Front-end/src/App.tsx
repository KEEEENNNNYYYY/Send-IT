import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./logic/login/login.tsx";
import Dashboard from "./logic/dashboard/dashboard.tsx";
import Register from "./logic/register/register.tsx";
import Profil from "./logic/profil/profil.tsx";
import ProtectedRoutes from "./logic/routes/protectedRoutes.tsx";
import { useAuthProvider } from "./hooks/useAuth.ts";

const App = () => {
  const { userData, loading} = useAuthProvider();
  console.log("user ", userData);
  console.log("loading",loading);
   if (loading) {
    return <div>Chargement...</div>; // ou un vrai loader
  }

  const isConnected = !!userData; 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <ProtectedRoutes
              isConnected={isConnected}
            ></ProtectedRoutes>
          }
        >
          <Route path="/profil" element={<Profil />} />
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
