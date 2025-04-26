import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login.jsx";
import Reembolsos from "./components/reembolsos/Reembolsos.jsx";
import Solicitacao from "./components/solicitacao/Solicitacao.jsx";
import { AuthProvider } from "./authcontext/AuthContext.jsx";
import { ProtectedRoute } from "./protectedrouter/ProtectedRoute.jsx";
import PublicRoute from "./publicroute/PublicRoute.jsx";
import "./global.scss";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Login/></PublicRoute>} />
        <Route path="/reembolsos" element={<ProtectedRoute><Reembolsos/></ProtectedRoute>} />
        <Route path="/solicitacao" element={<ProtectedRoute><Solicitacao/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
