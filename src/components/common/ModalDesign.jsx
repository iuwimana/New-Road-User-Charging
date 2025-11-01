import React from 'react';
import './modaldesign.css'

const Modal = ({ isOpen, onClose, title, children , size = "modal-lg" }) => {
    if (!isOpen) return null;
  
    return (
      <>
        <div className=" fade show" onClick={onClose} />
        
        <div className="modal d-block" tabIndex="-1">
          <div className={`modal-dialog modal-dialog-centered ${size} modal-custom`}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={onClose}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {children}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };


export default Modal;