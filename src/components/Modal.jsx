const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modalContainer">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
