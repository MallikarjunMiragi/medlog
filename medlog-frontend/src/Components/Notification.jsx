import React, { useEffect, useRef } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import "../styles.css"; // Ensure you create this file for styling

Modal.setAppElement("#root");

const Notification = ({ isOpen, onRequestClose, title, message = "Something went wrong!", type = "info", children }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "450px",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        },
      }}
    >
      <div className={`notification-header ${type}`}>
        <h4>{title || "Notification"}</h4>
      </div>
      <div className="notification-content">{message}</div>
      {children && <div className="notification-children">{children}</div>}
      <button ref={closeButtonRef} onClick={onRequestClose} className="notification-close-btn">
        Close
      </button>
    </Modal>
  );
};

Notification.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info"]),
  children: PropTypes.node,
};

export default Notification;
