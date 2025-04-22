import styles from "./Modal.module.scss"
function Modal({show, children}) {
  return (
    <div className={`${styles.modal} ${show ? styles.modal_show : ''}`}>
        {children}
    </div>
  )
}

export default Modal