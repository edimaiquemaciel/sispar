import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../authcontext/AuthContext";
import { ProgressSpinner } from 'primereact/progressspinner';

function PublicRoute({children}) {
    const {user, loading} = useContext(AuthContext);
    if (loading) {
        return (
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".8s" />
          </div>
        );
      }

  return !user ? children : <Navigate to={"/reembolsos"} />
}

export default PublicRoute;