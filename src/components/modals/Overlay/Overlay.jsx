import styles from "./Overlay.module.scss"

function Overlay({show}) {
  return (
    <div className={`${styles.overlay} ${show ? styles.overlay_show : ''}`}></div>
  )
}

export default Overlay