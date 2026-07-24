import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  let modalRef = React.useRef();

  React.useEffect(() => {
    function handleClickOutside({ target }) {
      if (modalRef.current && !modalRef.current.contains(target)) {
        if (isOpen) onClose() 
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div ref={modalRef} className={styles.modalBody}>
          <div>
            <button className="closeButton btnModal" onClick={onClose}>
              &times;
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
