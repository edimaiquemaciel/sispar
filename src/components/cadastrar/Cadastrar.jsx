import styles from "./Cadastrar.module.scss"
import Logo from "../../assets/Tela Login/logo-ws.png";
import { useForm, Controller  } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod"
import {ErrorMessage} from "@hookform/error-message"
import { registerSchema } from "../../schemas/register";
import { useHookFormMask } from "use-mask-input";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { InputNumber } from 'primereact/inputnumber';
import { useContext } from "react";
import { AuthContext } from "../../authcontext/AuthContext";
import { useEffect } from "react";
import toast from "react-hot-toast";
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import { Loader } from "lucide-react";


function Cadastrar() {
  const {singup} = useContext(AuthContext);
  const navigate = useNavigate();
  const {register, handleSubmit, getValues, setValue, setError, clearErrors, setFocus, reset, control, formState: {isSubmitting, errors}} = useForm({ 
    resolver: zodResolver(registerSchema),
    
  });
  const registerWithMask = useHookFormMask(register);
  const onSubmit = async (data) => {
    delete data.terms;
    delete data.confirmacao_senha;
    const sanitizedData = {
      ...data,
      telefone: data.telefone.replace(/\D/g, ""),
      cep: data.cep.replace(/\D/g, "")
    };
    try {
      const sucesso = await singup(sanitizedData);
      if(sucesso === "Dado cadastrado com sucesso"){
        reset({
          // outros campos com suas strings vazias normais
          salario: null // Importante usar null em vez de string vazia para campos numéricos
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast.success("Cadastro realizado com sucesso!", {
          duration: 5000,
          icon: "✅"
        });
        
        setTimeout(() => {
          navigate("/login");
        }, 6000);
      }
      
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
          style: {
            color: 'red',
          },
      })
      setError("email",{
        type: "manual",
        message: error.message
      })
      setFocus("email");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50); // ou até 100ms, se precisar
  }, []);
  
  

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
          setValue("endereco", "");
          setValue("cidade", "");
        }
        console.log(data);
        if(!data.erro) {
          setValue("endereco", logradouro);
          setValue("cidade", localidade);

          clearErrors("endereco");
          clearErrors("cidade");
          clearErrors("cep");
        }
      }
      if(cep.length < 8) {
        setError("cep", {
          type: "manual",
          message: "CEP inválido! Por favor, verifique e insira todos os dígitos corretamente."
        })
        setValue("endereco", "");
        setValue("cidade", "");
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
            <label htmlFor="nome">Nome Completo</label>
            <InputText placeholder="Digite seu nome completo" id="nome" {...register("nome")} invalid={!!errors.nome}/>
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="nome" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">E-mail</label>
            <InputText placeholder="seu@email.com" id="email" {...register("email")} invalid={!!errors.email} />
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="email" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="cargo">Cargo</label>
            <InputText placeholder="Informe seu cargo" id="cargo" {...register("cargo")} invalid={!!errors.cargo}/>
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="cargo" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="salario">Salário</label>
            <Controller
              name="salario"
              control={control}
              render={({ field }) => (
                <InputNumber
                  id="salario"
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  mode="currency"
                  currency="BRL"
                  locale="pt-BR"
                  placeholder="Informe seu salário"
                  style={{ display: "block" }}
                  invalid={!!errors.salario}
                  inputRef={field.ref}
                />
              )}
            />
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="salario" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="telefone">Telefone</label>
            <InputText id="telefone" placeholder="(99) 99999-9999" {...registerWithMask("telefone", "(99) 99999-9999")} invalid={!!errors.telefone}/>
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="telefone" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="cep">CEP</label>
            <InputText placeholder="99999-99" id="cep" {...registerWithMask("cep", "99999-999")} onBlur={()=> buscaCep()} invalid={!!errors.cep}/>
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="cep" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="endereco">Endereço</label>
            <InputText id="endereco" readOnly {...register("endereco")} invalid={!!errors.endereco}/>
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="endereco" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="cidade">Cidade</label>
            <InputText id="cidade" readOnly  {...register("cidade")} invalid={!!errors.cidade}/>
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="cidade" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="senha">Senha</label>
            <Controller
              name="senha"
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
                  invalid={!!errors.senha}
                  inputRef={field.ref}
                />
              )}
            />
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="senha" />
            </p>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="confirmacao_senha">Confirmar Senha</label>
            <Controller
              name="confirmacao_senha"
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
                  invalid={!!errors.confirmacao_senha}
                  inputRef={field.ref}
                />
              )}
            />
            <p className={styles.ErrorMessage}>
              <ErrorMessage errors={errors} name="confirmacao_senha" />
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
            <button type="submit" >
              {isSubmitting ? <Loader className={styles.spin} /> : "Criar conta"}
            </button>
          </div>
          <div className={styles.divider}>ou</div>
        </form>
        <p className={styles.login_link}>Já tem uma conta? <Link to={"/login"}>Faça login</Link></p>
      </section>
    </main>
  )
}

export default Cadastrar