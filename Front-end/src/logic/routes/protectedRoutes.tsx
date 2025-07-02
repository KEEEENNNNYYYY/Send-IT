import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRoutesProps{
    isConnected : boolean
}
const ProtectedRoutes = ({isConnected}:ProtectedRoutesProps)=>{
    return isConnected ?<Outlet></Outlet>: <Navigate to={"/login"} replace></Navigate>
}
export default ProtectedRoutes;