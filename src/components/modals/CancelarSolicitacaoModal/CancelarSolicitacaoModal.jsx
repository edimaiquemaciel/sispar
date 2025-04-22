import Modal from "../Modal/Modal"
import styles from "../Modal/Modal.module.scss"

function CancelarSolicitacaoModal({show, cancelarSolicitacao, setModalCancelarSolicitacao}) {
  return (
    <Modal show={show}>
        <p>Tem certeza que deseja cancelar a solicitação?</p>
            <div className={styles.btnModal}>
                <button onClick={() => setModalCancelarSolicitacao(false) }>Continuar Editando</button>
                <button onClick={() => {
                cancelarSolicitacao();
                setModalCancelarSolicitacao(false);
                } }>Sim, cancelar</button>
            </div>
    </Modal>
  )
}

export default CancelarSolicitacaoModal