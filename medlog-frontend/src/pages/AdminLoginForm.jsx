  import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../reducers/authReducer";
import Image from "../assets/photo/login.mp4";
import Notification from "../Components/Notification";
//import "../styles.css";

const AdminLoginForm = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ isOpen: false, title: "", message: "", type: "info" });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.auth);
  const videoRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });

    if ((e.target.name === "emailId" || e.target.name === "password") && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      videoRef.current.play();
    }
  };

  const handleBlur = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.emailId || !formData.password) {
    setErrors({ login: "Email and Password are required." });
     setNotification({ isOpen: true, title: "Error", message: "Email and Password are required.", type: "error" });
    return;
  }


  const result = await dispatch(loginUser(formData));

  if (loginUser.fulfilled.match(result)) {
      const userRole = result.payload.role; // Extract role from backend response
      
  
      console.log("✅ Login successful! Role:", userRole);
  
      if (userRole === "admin") {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else if (userRole === "doctor") {
        navigate("/doctor-home");
      } else {
        navigate("/logbookpage");
      }
      
  
      setNotification({ isOpen: true, title: "Success", message: "Login successful! Redirecting...", type: "success" });
  } else {
    console.log("❌ Login failed:", result.payload?.error || "Unknown error");
  
    const backendError = result.payload?.error || "Invalid email or password.";
  
    setErrors({ login: backendError });
    setNotification({
      isOpen: true,
      title: "Login Failed",
      message: backendError,
      type: "error",
    });
  }
  
  
};

  const handleRegister = () => {
    navigate("/register");
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
              type="email"
              placeholder="Enter your email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              onBlur={handleBlur}
              required
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
              required
            />
            {/* {errors.password && <div className="error">{errors.password}</div>}
            {errors.login && <div className="error">{errors.login}</div>} */}

            {isForgotPasswordVisible && (
              <button type="button" className="forgot-password-button">
                Forgot Password?
              </button>
            )}

            <div className="button-group">
              <button type="submit" className="button" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              <button type="button" onClick={handleRegister} className="register-button">
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="video-container">
          <video ref={videoRef} className="video" autoPlay loop muted>
            <source src={Image} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Notification Modal */}
      <Notification
        isOpen={notification.isOpen}
        onRequestClose={() => setNotification({ ...notification, isOpen: false })}
        title={notification.title}
        message={notification.message}
        type={notification.type}
      />
    </section>
  );
};

export default AdminLoginForm;
