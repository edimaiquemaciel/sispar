import styles from "./NotFound.module.scss"
import { useNavigate } from "react-router-dom"
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.containerNotfound}>
        <div>
          <h1>404</h1>
          <p>Página não encontrada</p>
        </div>
        <p>Esta página não existe ou foi removida</p>
        <button onClick={()=> navigate("/")}>Voltar ao início</button>
    </div>
  )
}

export default NotFound