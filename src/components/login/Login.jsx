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

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';        
        

function Login() {

  const {login} = useContext(AuthContext);
  const {register, handleSubmit, control, formState: {errors}} = useForm({
    resolver: zodResolver(loginSchema)
  });
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
    
    try {
      const sucesso = await login(data.email, data.senha);
      console.log(sucesso);
      

    if(sucesso) {
      navigate("/reembolsos");
    }
    } catch (error) {
      console.log("Erro no login:", error);
      setError(error.message);
      
    }
  }

  const navigate = useNavigate() 


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
          <div className={styles.inputWrapper}>
            <InputText
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
              onInput={()=> setError('')}
            />
            <p style={{color: "red", margin: "0", padding: "0"}}>
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
                  invalid={!!errors.senha}
                  inputRef={field.ref}
                  placeholder="Senha"
                />
              )}
            />
            <p style={{color: "red", margin: "0", padding: "0"}}>
              <ErrorMessage errors={errors} name="senha" />
            </p>
          </div>
          
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
