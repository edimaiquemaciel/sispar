import { useNavigate } from "react-router-dom"
import styles from "./Reembolsos.module.scss";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Analises from "../../assets/Dashboard/Análises.png";
import NumeroAnalises from "../../assets/Dashboard/N-Análises.png";
import NumeroAprovados from "../../assets/Dashboard/N-Aprovados.png";
import NumeroRejeitados from "../../assets/Dashboard/N-Rejeitados.png";
import NumeroSolicitados from "../../assets/Dashboard/N-Solicitados.png";
import Sistema from "../../assets/Dashboard/Sistema-atualizado.png";
import SolicitarHistorico from "../../assets/Dashboard/Solicitar - Histórico.png";
import SolicitarReembolso from "../../assets/Dashboard/Solicitar - Reembolso.png";

function Rembolsos() {
  const navigate = useNavigate()

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <header>
        <HomeOutlinedIcon sx={{color: "#282c2c", marginBottom: "-7px"}} />
          <KeyboardArrowRightOutlinedIcon sx={{color: "#d0d4e4", fontSize: "20px", marginBottom: "-5.5px"}} />
          <p> Reembolsos</p>
        </header>
        <main className={styles.mainReembolsos}>
          <div className={styles.container_reembolso}>
            <h1>Sistema de Reembolsos</h1>
            <p>
              Solicite novos pedidos de reembolso, visualize solicitações em análise
              e todo o histórico.
            </p>
            <section className={styles.containerCards}>
              <article className={styles.card}  onClick={()=>{navigate("/solicitacao")}} >
                <img src={SolicitarReembolso} alt="" />
                <p>Solicitar Reembolso</p>
              </article>
              <article className={styles.card}>
                <img src={Analises} alt="" />
                <p>Verificar análises</p>
              </article>
              <article className={styles.card}>
                <img src={SolicitarHistorico} alt="" />
                <p>Histórico</p>
              </article>
            </section>
            <section className={styles.containerDados}>
              <div>
                <img
                  className={styles.imgSolicitados}
                  src={NumeroSolicitados}
                  alt=""
                />
                <h4>182</h4>
                <p>Solicitados</p>
              </div>
              <div>
                <img className={styles.imgAnalise} src={NumeroAnalises} alt="" />
                <h4>74</h4>
                <p>Em análise</p>
              </div>
              <div>
                <img className={styles.imgAprovados} src={NumeroAprovados} alt="" />
                <h4>195</h4>
                <p>Aprovados</p>
              </div>
              <div>
                <img
                  className={styles.imgRejeitados}
                  src={NumeroRejeitados}
                  alt=""
                />
                <h4>41</h4>
                <p>Rejeitados</p>
              </div>
            </section>
            <section className={styles.containerSistema}>
              <img src={Sistema} alt="" />
              <a href="">Sistema atualizado.</a>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Rembolsos;
