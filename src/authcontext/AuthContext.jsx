import { createContext, useState, useEffect } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import {jwtDecode} from "jwt-decode";
import Api from "../Services/Api.jsx"

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const isDesktopScreen = useMediaQuery('(min-width:1440px)');
    const isTabletScreen = useMediaQuery('(max-width:768px)');
    const isSmartPhoneScreen = useMediaQuery('(max-width:412px)');

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");
        
        try {
          const { exp } = jwtDecode(savedToken);

          if (Date.now() < exp * 1000) {
            setUser(JSON.parse(savedUser));
          } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Token inválido:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }

        setLoading(false);

    }, [])

    const login = async (email, password) => {
        try {
          const res = await Api.post('/colaborador/login', {
            email: email,
            senha: password,
          });
      
          const data = res.data;
          
      
          if (res.status === 200 && data.mensagem === "Login realizado com sucesso") {
            const token = data.token;
            const { exp } = jwtDecode(token);
            if (Date.now() >= exp * 1000) {
              throw new Error("Token expirado. Faça login novamente.");
            }
            const user = {
              email: data.email,
              nome: data.nome,
              cargo: data.cargo,
              id_colaborador: data.id
            };
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            return true;
          }
        } catch (error) {
          console.error('Erro no login', error.response?.data?.mensagem || error.message);
          throw new Error(error.response?.data?.mensagem || 'Erro desconhecido ao fazer login');
        }
      }

      const signup = async (sanitizedData) => {

        try {
          const res = await Api.post("/colaborador/cadastrar", sanitizedData);
          const data = res.data;
          console.log(data);
        
          if (res.status === 400) {
            throw new Error(data?.mensagem || "Erro ao cadastrar");
          }

          if(res.status === 201 && data.mensagem === "Dado cadastrado com sucesso"){
            return data.mensagem;
          }
        
        } catch (error) {
          console.error('Erro no login', error.response?.data?.mensagem || error.message);
          throw new Error(error.response?.data?.mensagem || 'Erro desconhecido');
        }

      }
    

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }


    return (
        <AuthContext.Provider value={{user, login, logout, signup, isTabletScreen, isSmartPhoneScreen, isDesktopScreen, loading}}>
            {children}
        </AuthContext.Provider>
    )
}


export {AuthContext, AuthProvider}