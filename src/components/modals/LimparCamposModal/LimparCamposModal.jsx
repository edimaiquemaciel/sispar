import Modal from "../Modal/Modal";
import styles from "../Modal/Modal.module.scss";

function LimparCamposModal({show, reset, setModalLimparCampos }) {
  return (
    <Modal show={show}>
        <p>Deseja limpar os campos preenchidos acima?</p>
        <div className={styles.btnModal}>
            <button onClick={() => setModalLimparCampos(false) }>Continuar Editando</button>
            <button onClick={() => {
            reset();
            setModalLimparCampos(false);
            }}>Sim, limpar</button>
        </div>
    </Modal>
  )
}

export default LimparCamposModal