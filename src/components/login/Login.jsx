import {useNavigate} from "react-router-dom"
import Logo from "../../assets/Tela Login/logo-ws.png";
import styles from "./Login.module.scss"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

function Login() {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate() 

  const irParaReembolsos = () => {
    navigate("/reembolsos") 
  }

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

        <form>
          <input type="email" name="email" id="email" placeholder="Email" />

          <div className={styles.input_wrapper}>
            <input
              type={visible ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Senha"
            />
            <div className={styles.input_icon}>
              {visible ? (<VisibilityIcon className={styles.iconEye} onClick={()=> setVisible(!visible)} />) : (<VisibilityOffIcon className={styles.iconEye} onClick={()=> setVisible(!visible)} />)}
            </div>
          </div>

          <p><a href="#">Esqueceu a senha?</a></p>

          <div className={styles.boxButton}>
            <button onClick={irParaReembolsos}>Entrar</button>
            <button>Criar conta</button>
          </div>

        </form>
      </section>
    </main>
  );
}
export default Login;
