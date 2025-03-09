import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '../ui/progressBar';

const Modal = ({ isOpen, onClose, children ,progress}) => {
  if (!isOpen) return null; // Don't render the modal if it's closed

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-75 z-40" /> {/* Slight black overlay */}

      {/* Modal Content */}
      <div className="relative bg-background p-6 rounded-lg shadow-lg max-w-lg w-full z-50 capitalize">
        {children}
        <div className="flex justify-center items-center mt-4">
          <CircularProgress progress={progress} />
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;