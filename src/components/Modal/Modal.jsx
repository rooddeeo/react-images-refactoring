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

  useEffect((props) => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        props.closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

// class Modal extends Component {
//   backdropCloseModal = event => {
//     if (event.target === event.currentTarget) {
//       this.props.closeModal();
//     }
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };

//   render() {
//     const { largeImage, tags } = this.props;
//     return createPortal(
//       <div className={css.overlay} onClick={this.backdropCloseModal}>
//         <div className={css.modal}>
//           <img src={largeImage} width="800" height="600" alt={tags} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }

// export default Modal;
