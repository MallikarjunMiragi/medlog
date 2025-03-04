import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import "../styles.css"; // Ensure this file is present

Modal.setAppElement("#root");

const Notification = ({ isOpen, onRequestClose, title = "Notification", message = "An error occurred!", type = "info" }) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          width: "400px",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
        },
      }}
    >
      <h4 className={`notification-header ${type}`}>{title}</h4>
      <div className="notification-message">{message}</div>
      <button onClick={onRequestClose} className="notification-close-btn">Close</button>
    </Modal>
  );
};

Notification.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(["success", "error", "info"]),
};

export default Notification;
