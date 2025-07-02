import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./logic/login/login.tsx";
import Dashboard from "./logic/dashboard/dashboard.tsx";
import Register from "./logic/register/register.tsx";
import Profil from "./logic/profil/profil.tsx";
import ProtectedRoutes from "./logic/routes/protectedRoutes.tsx";
import { useAuthProvider } from "./hooks/useAuth.ts";

const App = () => {
  //@ts-expect-error nope pas besoin de cet erreur
  const { userData, loading } = useAuthProvider();
  console.log("user ", userData);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <ProtectedRoutes
              isConnected={userData == null && loading == true ? false : true}
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
