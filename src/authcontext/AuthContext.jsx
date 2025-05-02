import { createContext, useState, useEffect } from "react";
import Api from "../Services/Api.jsx"

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if(savedUser) {
            setUser(JSON.parse(savedUser));
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
            const fakeToken = 'token-falso-123';
            const user = {
              email: data.email,
              nome: data.nome,
              cargo: data.cargo,
            };
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', fakeToken);
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
        <AuthContext.Provider value={{user, login, logout, signup, loading}}>
            {children}
        </AuthContext.Provider>
    )
}


export {AuthContext, AuthProvider}