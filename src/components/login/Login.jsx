import {useNavigate} from "react-router-dom"
import Logo from "../../assets/Tela Login/logo-ws.png";
import styles from "./Login.module.scss"
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../authcontext/AuthContext";
import { useForm, Controller } from "react-hook-form";
import { loginSchema } from "../../schemas/login";
import {zodResolver} from "@hookform/resolvers/zod"
import {ErrorMessage} from "@hookform/error-message"
import { Loader } from "lucide-react";
import { useRef } from "react";
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
        

function Login() {
  const toast = useRef(null);
  const {login, isTabletScreen, isDesktopScreen} = useContext(AuthContext);
  const {register, handleSubmit, control, formState: {errors, isSubmitting}} = useForm({
    resolver: zodResolver(loginSchema)
  });
  const [error, setError] = useState('');
  

  const onSubmit = async (data) => {
    
    try {
      const sucesso = await login(data.email, data.senha);
      console.log(sucesso);
      

    if(sucesso) {
      navigate("/reembolsos");
    }
    } catch (error) {
      console.log("Erro no login:", error);
      if(error.message === "Usuário não encontrado.") {
        toast.current.show({ 
          severity: 'error', 
          detail: error.message,
          life: 4500,
          style: {
          transform: isDesktopScreen ? "translateX(-5%)" : "",
          marginBottom: "16px"
        }});
        setError(error.message);
      }else if(error.message === "Credenciais invalidas"){
        toast.current.show({ 
          severity: 'error', 
          detail: "Senha incorreta",
          life: 4500,
          style: {
          transform: isDesktopScreen ? "translateX(-5%)" : ""
        }});
        setError(error.message);
      }
    }
  }

  const navigate = useNavigate() 


  return (
    <main className={styles.mainLogin}>
      
      <section className={styles.containerFoto}>
      </section>

      <section className={styles.formWapper}>
        <Toast ref={toast} position={isTabletScreen ? "top-center" : "top-right"}/>
        <div className={styles.boxLogo}>
          <img src={Logo} alt="Logo da wilson sons" />
          <h1>Boas vindas ao Novo Portal SISPAR </h1>
          <p>Sistema de Emissão de Boletos e Parcelamento</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <InputText
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
              onInput={()=> setError('')}
              invalid={!!errors.email || error === "Usuário não encontrado."}
            />
            <p>
              <ErrorMessage errors={errors} name="email" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <Controller
              name="senha"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Password
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={field.onBlur}
                  onInput={()=> setError('')}
                  toggleMask
                  style={{ display: "block" }}
                  feedback={false}
                  invalid={!!errors.senha || error === "Credenciais invalidas"}
                  inputRef={field.ref}
                  placeholder="Senha"
                />
              )}
            />
            <p>
              <ErrorMessage errors={errors} name="senha" />
            </p>
          </div>
          
          <p><a href="#">Esqueceu a senha?</a></p>

          <div className={styles.boxButton}>
            <button type="submit" >
              {isSubmitting ? <Loader className={styles.spin} /> : "Entrar"}
            </button>
            <button type="button" onClick={()=> navigate("/cadastrar")}>Criar conta</button>
          </div>
        </form>
      </section>
    </main>
  );
}
export default Login;
