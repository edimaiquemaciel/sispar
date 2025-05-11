import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import PublicRoute from './publicroute/PublicRoute.jsx'
import Cadastrar from './components/cadastrar/Cadastrar.jsx'
import Login from './components/login/Login.jsx'
import { ProtectedRoute } from './protectedrouter/ProtectedRoute.jsx'
import Solicitacao from './components/solicitacao/Solicitacao.jsx'
import Reembolsos from "./components/reembolsos/Reembolsos.jsx"
import { AuthProvider } from './authcontext/AuthContext.jsx'

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import NotFound from './components/notfound/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: "/cadastrar",
    element: (
      <PublicRoute>
        <Cadastrar />
      </PublicRoute>
    )
  },
  {
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/reembolsos",
        element: <Reembolsos />
      },
      {
        path: "/solicitacao",
        element: <Solicitacao />
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster
      toastOptions={{
        style: {
          minWidth: "350px",
          maxWidth: "500px",
          fontSize: "1rem",
        },
      }}
    />

    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
