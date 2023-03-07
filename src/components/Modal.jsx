import React from 'react';
import '../sass/Modal.scss';

function Modal({ isOpen, handleClose, children }) {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            {/* <button className="modal-close" onClick={handleClose}>
              X
            </button> */}
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
