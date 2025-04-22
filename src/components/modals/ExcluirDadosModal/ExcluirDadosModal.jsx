import Modal from "../Modal/Modal";
import styles from "../Modal/Modal.module.scss";

function ExcluirDadosModal({show, handleDelete, getIndex, setModalExluirDados }) {
  return (
    <Modal show={show}>
        <p>Deseja realmente exluir os dados dessa linha?</p>
        <div className={styles.btnModal}>
            <button onClick={() => setModalExluirDados(false) }>Continuar Editando</button>
            <button onClick={() => {
            handleDelete(getIndex);
            setModalExluirDados(false);
            } }>Sim, excluir</button>
        </div>
    </Modal>
  )
}

export default ExcluirDadosModal