import styles from "./Cadastrar.module.scss"
import Logo from "../../assets/Tela Login/logo-ws.png";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {ErrorMessage} from "@hookform/error-message"
import { registerSchema } from "../../schemas/register";
import { useHookFormMask } from "use-mask-input";

function Cadastrar() {
  const {register, handleSubmit, getValues, setValue, setError, formState: {errors}} = useForm({
    resolver: zodResolver(registerSchema),
  });
  const registerWithMask = useHookFormMask(register);
  const onSubmit = (data) => {
    console.log(data);
  }

  const buscaCep = async () => {
    const cep = getValues("cep");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      const data = await res.json();
      const {logradouro, localidade} = data;
      if(data.erro) {
        setError("cep", {
          type: "manual",
          message: "CEP não encontrado. Verifique e tente novamente."
        })
        setValue("address", "");
        setValue("city", "");
      }
      console.log(data);
      if(!data.erro) {
        setValue("address", logradouro);
        setValue("city", localidade);
        setError("address", {
          type: "manual",
          message: ""
        });
        setError("city", {
          type: "manual",
          message: ""
        })
        setError("cep", { message: "" });
      }

    } catch (error) {
      console.error("erro do cep:", error);
    }
    
  }


  return (
    <main className={styles.containerCadastro}>
      <section className={styles.contentCadastro}>
        <div className={styles.cabecalhoCadastro}>
          <img src={Logo} alt="Logo da wilson sons" />
          <h1>Cadastre-se no SISPAR</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <label>Nome Completo</label>
            <input type="text" placeholder="Digite seu nome completo" id="name" {...register("name")} />
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="name" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label>E-mail</label>
            <input type="text" placeholder="seu@email.com" id="email" {...register("email")} />
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="email" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label>Telefone</label>
            <input type="text" id="phone" placeholder="(99) 99999-9999" {...registerWithMask("phone", "(99) 99999-9999")} />
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="phone" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label>CEP</label>
            <input type="text" placeholder="99999-99" id="cep" {...registerWithMask("cep", "99999-999")} onBlur={()=> buscaCep()} />
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="cep" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label>Endereço</label>
            <input type="text" id="address" readOnly {...register("address")}/>
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="address" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label>Cidade</label>
            <input type="text" id="city" readOnly  {...register("city")}/>
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="city" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label>Senha</label>
            <input type="password" id="password" placeholder="Digite sua senha" {...register("password")}/>
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="password" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label>Confirmar Senha</label>
            <input type="password" id="password_confirmation" placeholder="Confirme sua senha" {...register("password_confirmation")}/>
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="password_confirmation" />
            </p>
          </div>
          <div className={styles.password_requirements}>
            <h3>Requisitos de Senha</h3>
            <ul>
              <li>Mínimo de 8 caracteres</li>
              <li>Pelo menos um caractere maiúsculo</li>
              <li>Pelo menos um caractere minúsculo</li>
              <li>Pelo menos um número</li>
              <li>Pelo menos um caractere especial (@, #, $, etc.)</li>
            </ul>
          </div>
          <div className={styles.inputWrapper_checkbox}>
            <input type="checkbox" id="terms" required {...register("terms")} />
            <label>Li e concordo com os <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a></label>
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="terms" />
            </p>
          </div>
          <div className={styles.btnCadastrar}>
            <button type="submit" >Criar conta</button>
          </div>
        </form>
      </section>
      
    </main>
  )
}

export default Cadastrar