import {useNavigate} from "react-router-dom"
import Logo from "../../assets/Tela Login/logo-ws.png";
import styles from "./Login.module.scss"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../authcontext/AuthContext";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../schemas/login";
import {zodResolver} from "@hookform/resolvers/zod"
import {ErrorMessage} from "@hookform/error-message"

function Login() {

  const {login, user} = useContext(AuthContext);
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(loginSchema)
  });
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(false);
  console.log(user);
  
  

  const onSubmit = async (data) => {
    try {
      const sucesso = await login(data.email, data.password);
      console.log(sucesso);
      

    if(sucesso) {
      navigate("/reembolsos");
    }else {
      setError("Usuário ou senha inválidos")
    }
    } catch (error) {
      console.error("Erro no login:", error);
      setError(error.message);
      
    }
  }

  const navigate = useNavigate() 

  // const irParaReembolsos = () => {
  //   navigate("/reembolsos") 
  // }

  return (
    <main className={styles.mainLogin}>
      <section className={styles.containerFoto}>
      </section>

      <section className={styles.formWapper}>
        <div className={styles.boxLogo}>
          <img src={Logo} alt="Logo da wilson sons" />
          <h1>Boas vindas ao Novo Portal SISPAR </h1>
          <p>Sistema de Emissão de Boletos e Parcelamento</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input 
            type="email" 
            id="email" 
            placeholder="Email"
            {...register("email")}
            onInput={()=> setError('')}
          />
          <p style={{color: "red", margin: "0", padding: "0"}}>
            <ErrorMessage errors={errors} name="email" />
          </p>
          <div className={styles.input_wrapper}>
            <input
              type={visible ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Senha"
              {...register("password")}
              onInput={()=> setError('')}
            />
            <div className={styles.input_icon}>
              {visible ? (<VisibilityIcon className={styles.iconEye} onClick={()=> setVisible(!visible)} />) : (<VisibilityOffIcon className={styles.iconEye} onClick={()=> setVisible(!visible)} />)}
            </div>
          </div>
          <p style={{color: "red", margin: "0", padding: "0"}}>
            <ErrorMessage errors={errors} name="password" />
          </p>
          {error && <p style={{color: "red", margin: "0", padding: "0"}}>{error}</p>}

          <p><a href="#">Esqueceu a senha?</a></p>

          <div className={styles.boxButton}>
            <button type="submit" >Entrar</button>
            <button type="button" onClick={()=> navigate("/cadastrar")}>Criar conta</button>
          </div>

        </form>
      </section>
    </main>
  );
}
export default Login;
