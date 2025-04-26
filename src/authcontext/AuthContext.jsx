import { createContext, useState, useEffect } from "react";

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
            const res = await fetch("http://localhost:5000/colaborador/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"email": email, "senha": password})
            })
    
            const data = await res.json();

            if(!res.ok) {
               throw new Error(data.mensagem || "Erro desconhecido ao fazer login") 
            }
            
    
            if(data.mensagem === 'Login realizado com sucesso') {
                const fakeToken = "token-falso-123";
                const user = {
                    email: data.email,
                    nome: data.nome,
                    cargo: data.cargo,
                }
                setUser(user);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", fakeToken);
                return true;
            }else {
                throw new Error(data.mensagem)
            }
        } catch (error) {
            console.error("Erro no login", error.mensagem);
            throw error;
        }
    }
    

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}


export {AuthContext, AuthProvider}