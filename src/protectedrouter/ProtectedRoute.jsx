import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../authcontext/AuthContext";

export const ProtectedRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    if(loading) return <p>Carregando sessao...</p>
    return user ? children : <Navigate to={"/"} />
}