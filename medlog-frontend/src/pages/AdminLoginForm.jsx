import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../reducers/authReducer"; // Ensure the correct import path
import Image from "../assets/photo/login.mp4";
import "../styles.css";

const AdminLoginForm = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.auth);
  const videoRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });

    // Play video when user starts typing
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
      return;
    }

    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      console.log("correct user");
//new
      navigate("/logbookpage"); // Navigate to the logbook page upon successful login
    } else {
      console.log("incorrect");
      setErrors("Invalid email or password. Please register." );
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Navigate to RegistrationPage
  };

  const isForgotPasswordVisible = formData.emailId.toLowerCase() !== "admin@gmail.com";

  return (
    <section className="login-container">
      <div className="login-form">
        <div className="form-container">
          <h2 className="form-heading">Login</h2>
          {error && <p>{error?.message || JSON.stringify(error)}</p>
        }
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
            {errors.password && <div className="error">{errors.password}</div>}

            {errors.login && <div className="error">{errors.login}</div>}

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
    </section>
  );
};

export default AdminLoginForm;
