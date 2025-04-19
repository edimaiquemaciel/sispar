import { useState } from "react";
import Historico from "../../assets/Header/Botão - Histórico.png";
import HistoryIcon from '@mui/icons-material/History';
import Home from "../../assets/Header/botão - Home.png";
import Pesquisa from "../../assets/Header/Botão - Pesquisa.png";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import Reembolso from "../../assets/Header/Botão - Reembolso.png";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import Sair from "../../assets/Header/Botão - Sair.png";
import LogoutIcon from '@mui/icons-material/Logout';
import Perfil from "../../assets/Header/image.png";
import Fechar from "../../assets/Header/imagem-fechar-header.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import styles from "./NavBar.module.scss";
import { useNavigate } from "react-router-dom";

import "../../global.scss";



function NavBar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleMenu = () => {
    setShow(!show);
  }

  return (
    <nav id={`${show ? 'esconder' : ''}`} className={styles.navBarEstilo}>
      <div className={`${styles.menu} ${show ? 'active' : ''}`}>
        <div className={styles.btn_menu}>
          <p onClick={() => {
                navigate("/reembolsos");
              }}>Home</p>
          <p onClick={()=>{navigate("/solicitacao")}}>Reembolso</p>
          <p onClick={()=>{navigate("/reembolsos")}}>Pesquisa</p>
          <p onClick={()=>{navigate("/solicitacao")}}>Histórico</p>
        </div>
      </div>
      <button onClick={() => handleMenu()} className={styles.buttonNavBar}>
        <img src={Fechar} alt="Botão abrir e fechar" />
      </button>

      <section>
        <AccountCircleIcon sx={{ fontSize: 48, color: "#0844C4" }} />

        <div className={styles.containerNavbar}>
          <button className={styles.buttonNavBar}
            onClick={() => {
              navigate("/reembolsos");
            }}
          >
            <HomeIcon sx={{ color: "#FFFFFF" }} />
          </button>
            <button onClick={()=>{navigate("/solicitacao")}}  className={styles.buttonNavBar}>
              <RequestQuoteIcon sx={{ color: "#FFFFFF" }} />
            </button>

            <button onClick={()=>{navigate("/reembolsos")}}  className={styles.buttonNavBar}>
              <ContentPasteSearchIcon sx={{ color: "#FFFFFF" }} />
            </button>

            <button onClick={()=>{navigate("/solicitacao")}}  className={styles.buttonNavBar}>
              <HistoryIcon sx={{ color: "#FFFFFF" }} />
            </button>
        </div>
      </section>
      <button className={styles.buttonSair}  onClick={()=>{navigate("/")}} >
        <LogoutIcon sx={{ color: "#FFFFFF" }} />
      </button>
    </nav>
  );
}

export default NavBar;
