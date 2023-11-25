import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = props => {
  const backdropCloseModal = event => {
    if (event.target === event.currentTarget) {
      props.closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        props.closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props]);

  const { largeImage, tags } = props;

  return createPortal(
    <div className={css.overlay} onClick={backdropCloseModal}>
      <div className={css.modal}>
        <img src={largeImage} width="800" height="600" alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
