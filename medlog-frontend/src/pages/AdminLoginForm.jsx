import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../assets/photo/login.mp4";
import "../styles.css";  

const AdminLoginForm = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });

    if ((e.target.name === "emailId" || e.target.name === "password") && videoRef.current) {
      videoRef.current.muted = false;  // Ensure audio is on
      videoRef.current.volume = 1.0;   // Set max volume
      videoRef.current.play();
    }
  };

  const handleBlur = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { emailId } = formData;

    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (userDetails && userDetails.email === emailId) {
      navigate("/logbookpage");
    } else {
      localStorage.setItem("userEmail", emailId);
      navigate("/register");
    }
  };

  const isForgotPasswordVisible = formData.emailId.toLowerCase() !== "admin@gmail.com";

  return (
    <section className="login-container">
      <div className="login-form">
        <div className="form-container">
          <h2 className="form-heading">Login</h2>
          <form onSubmit={handleSubmit}>
            <label className="label">Email</label>
            <input
              className="input-field"
              type="text"
              placeholder="Enter your email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.emailId && <div className="error">{errors.emailId}</div>}

            <label className="label">Password</label>
            <input
              className="input-field"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && <div className="error">{errors.password}</div>}

            {isForgotPasswordVisible && (
              <button type="button" className="forgot-password-button">
                Forgot Password?
              </button>
            )}

            <button type="submit" className="button">
              Login
            </button>
          </form>
        </div>
        <div className="video-container">
          <video ref={videoRef} className="video" autoPlay loop>
            <source src={Image} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default AdminLoginForm;
