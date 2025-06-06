import React from "react";
import "./ComponentCSS/Toast.css";

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div className="toast-container">
      {message}
      <button onClick={onClose} className="toast-close">×</button>
    </div>
  );
};

export default Toast;
