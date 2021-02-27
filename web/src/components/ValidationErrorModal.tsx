import styles from '../styles/components/ValidationErrorModal.module.css';

interface ModalProps {
  page: 'login' | 'register';
  setModal: (arg0: boolean) => void;
}

export default function ValidationErrorModal({ setModal, page }: ModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <strong>Erro ao realizar ação</strong>
        { page === 'login' ? (
          <p>
            Cheque as informações fornecidas e tente novamente. Caso o erro 
            persista o problema deve estar do nosso lado.
          </p>
        ) : (
          <p>
            O nome de usuário já está em uso, escolha um novo por favor.
          </p>
        ) }

        <button type="button" onClick={() => setModal(false)}>
          <img src="/icons/close.svg" alt="Fechar modal"/>
        </button>
      </div>
    </div>
  );
}