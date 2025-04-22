import { useState } from "react";
import HistoryIcon from '@mui/icons-material/History';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import styles from "./NavBar.module.scss";
import { useNavigate } from "react-router-dom";

import "../../global.scss";

const routes = {
  home: "/reembolsos",
  reembolso: "/solicitacao",
  analise: "/reembolsos",
  historico: "/solicitacao",
  login: "/"
}



function NavBar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleMenu = () => {
    setShow(!show);
  }

  return (
    <nav className={styles.navBarEstilo}>
      <div onClick={() => handleMenu()} className={`${styles.overlay} ${show ? styles.overlay_show : ''}`}></div>
      <div className={`${styles.menu} ${show ? 'active' : ''}`}></div>
        {show ? <MenuOpenIcon onClick={() => handleMenu()} className={styles.menuIcon} sx={{fontSize: 40}} /> : <MenuIcon onClick={() => handleMenu()} className={styles.menuIcon} sx={{fontSize: 40}} />}
      <section>
        
        <div className={`${styles.accountDetailsNav} ${show ? styles.accountDetailsNav_active : ''}`}>
          <AccountCircleIcon className={styles.iconProfile} sx={{ fontSize: 45, color: "#0844C4" }} />
          <p>Edimaique Maciel</p>
          <p>Desenvolvedor FullStack jr</p>
        </div>
        <div className={styles.containerNavbar}>
          <div className={`${styles.btnNav} ${show ? styles.btnNav_active : ''}`}>
              <HomeIcon onClick={() => navigate(routes.home)} className={styles.icon} />
              <p onClick={() => navigate(routes.home) } className={`${styles.menuText} ${show ? styles.showText : ''}`}>Home</p>
          </div>
          <div className={`${styles.btnNav} ${show ? styles.btnNav_active : ''}`}>
              <RequestQuoteIcon onClick={() => navigate(routes.reembolso) } className={styles.icon} />
              <p onClick={() => navigate(routes.reembolso) } className={`${styles.menuText} ${show ? styles.showText : ''}`}>Reembolso</p>
          </div>
          <div className={`${styles.btnNav} ${show ? styles.btnNav_active : ''}`}>
              <ContentPasteSearchIcon onClick={() => navigate(routes.analise) } className={styles.icon} />
              <p onClick={() => navigate(routes.analise) } className={`${styles.menuText} ${show ? styles.showText : ''}`}>Análise</p>
          </div>
          <div className={`${styles.btnNav} ${show ? styles.btnNav_active : ''}`}>
              <HistoryIcon onClick={() => navigate(routes.historico) } className={styles.icon} />
              <p onClick={() => navigate(routes.historico) } className={`${styles.menuText} ${show ? styles.showText : ''}`}>Histórico</p>
          </div>
        </div>
      </section>
        <LogoutIcon onClick={()=> navigate(routes.login) } sx={{ color: "#FFFFFF", backgroundColor: "#63758d", padding: "2px 6px", transition: "all 0.5s ease-in-out" ,'&:hover': {backgroundColor: "#7A8DA7", cursor: "pointer"}, fontSize: 40, borderRadius: "5px", zIndex: "1000" }} />
    </nav>
  );
}

export default NavBar;
