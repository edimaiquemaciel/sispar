import styles from "./Cadastrar.module.scss"
import Logo from "../../assets/Tela Login/logo-ws.png";
import { useForm, Controller  } from "react-hook-form";
import { Link } from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod"
import {ErrorMessage} from "@hookform/error-message"
import { registerSchema } from "../../schemas/register";
import { useHookFormMask } from "use-mask-input";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"


function Cadastrar() {
  const {register, handleSubmit, getValues, setValue, setError, clearErrors, control, formState: {errors}} = useForm({
    resolver: zodResolver(registerSchema),
  });
  const registerWithMask = useHookFormMask(register);
  const onSubmit = (data) => {
    console.log(data);
  }

  const buscaCep = async () => {
    const cep = getValues("cep").replace(/[-_]/g, "");;
    
    try {
      if(cep.length === 8){
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

          clearErrors("address");
          clearErrors("city");
          clearErrors("cep");
        }
      }
      if(cep.length < 8) {
        setError("cep", {
          type: "manual",
          message: "CEP inválido! Por favor, verifique e insira todos os dígitos corretamente."
        })
        setValue("address", "");
        setValue("city", "");
      }
      
      if(cep.length === 0){
        clearErrors("cep");
        
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
          <h1>Bem-vindo ao SISPAR</h1>
          <p className={styles.subtitulo}>Sistema de Emissão de Boletos e Parcelamento</p>
          <p className={styles.descricao}>Complete seu cadastro para acessar todos os nossos serviços online.</p>
        </div>
          <p className={styles.form_title}><i className="pi pi-user" style={{ fontSize: '1.5rem', color: "#1DACFB", marginBottom: "10px" }}></i>Dados Pessoais</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <label>Nome Completo</label>
            <InputText  type="text" placeholder="Digite seu nome completo" id="name" {...register("name")} />
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="name" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label>E-mail</label>
            <InputText type="text" placeholder="seu@email.com" id="email" {...register("email")} />
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="email" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label>Telefone</label>
            <InputText id="phone" placeholder="(99) 99999-9999" {...registerWithMask("phone", "(99) 99999-9999")}/>
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="phone" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label>CEP</label>
            <InputText placeholder="99999-99" id="cep" {...registerWithMask("cep", "99999-999")} onBlur={()=> buscaCep()} />
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="cep" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label>Endereço</label>
            <InputText type="text" id="address" readOnly {...register("address")}/>
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="address" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label>Cidade</label>
            <InputText type="text" id="city" readOnly  {...register("city")}/>
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="city" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="password">Senha</label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Password
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={field.onBlur}
                  toggleMask
                  style={{ display: "block" }}
                  promptLabel="Digite sua senha" 
                  weakLabel="Senha fraca" 
                  mediumLabel="Senha média" 
                  strongLabel="Senha forte"
                  pt={{
                    panel: {
                      style: {
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        padding: '12px',
                      }
                    },
                  }}
                />
              )}
            />
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="password" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="password_confirmation">Confirmar Senha</label>
            <Controller
              name="password_confirmation"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Password
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={field.onBlur}
                  toggleMask
                  style={{ display: "block" }}
                  promptLabel="Digite sua senha" 
                  weakLabel="Senha fraca" 
                  mediumLabel="Senha média" 
                  strongLabel="Senha forte"
                  pt={{
                    panel: {
                      style: {
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        padding: '12px',
                      }
                    },
                  }}
                />
              )}
            />
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="password_confirmation" />
            </p>
          </div>
          <div className={styles.password_requirements}>
            <h3>Requisitos de Senha:</h3>
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
            
          </div>
          <p style={{textAlign: "center"}} className={styles.ErrorMessage}>
            <ErrorMessage errors={errors} name="terms" />
          </p>
          <div className={styles.btnCadastrar}>
            <button type="submit" >Criar conta</button>
          </div>
          <div class={styles.divider}>ou</div>
        </form>
        <p className={styles.login_link}>Já tem uma conta? <Link to={"/login"}>Faça login</Link></p>
      </section>
    </main>
  )
}

export default Cadastrar