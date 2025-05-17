import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../reducers/authReducer";
import Image from "../assets/photo/login.mp4";
import Notification from "../Components/Notification";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const AdminLoginForm = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ isOpen: false, title: "", message: "", type: "info" });
  const location= useLocation();
  const email = location.state?.email || ""; // Get email from location state 
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
  useEffect(() => {
    if (email) {
      setFormData((prev) => ({ ...prev, emailId: email }));
    }
  }, [email]);

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
    // } else {
    //   console.log("❌ Invalid credentials");
    //   setErrors({ login: "Invalid email or password. Please register." });
    //   setNotification({ isOpen: true, title: "Error", message: "Invalid email or password.", type: "error" });
    // }
    } else if (result.payload?.error === "Account pending approval") {
  console.log("⏳ Approval pending");
  setErrors({ login: "Approval pending. Please wait for admin approval." });
  setNotification({ isOpen: true, title: "Pending", message: "Approval pending. Please wait for admin approval.", type: "warning" });
} else {
  console.log("❌ Invalid credentials");
  setErrors({ login: "Invalid email or password. Please register." });
  setNotification({ isOpen: true, title: "Error", message: "Invalid email or password.", type: "error" });
}
};




  const handleRegister = () => {
    navigate("/register");
  };

  const isForgotPasswordVisible = formData.emailId.toLowerCase() !== "admin@gmail.com";

  return (
    <section className="flex justify-center items-center h-full w-full">
      <div className="flex w-[800px] max-w-[90%] bg-white/10 shadow-md rounded-md text-white">
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h2 className="text-center text-xl mb-5 font-bold">Login</h2>
          <form onSubmit={handleSubmit}>
            <label className="mb-1 block font-bold">Email</label>
            <input
              className="w-full p-3 mb-4 rounded-md bg-white/20"
              type="email"
              placeholder="Enter your email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.emailId && <div className="text-red-800 bg-red-200 border-l-2 border-red-500">{errors.emailId}</div>}

            <label className="mb-1 block font-bold">Password</label>
            <input
              className="w-full p-3 mb-4 rounded-md bg-white/20"
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
              <button
              type="button"
              className="w-full p-3 text-[#22615f] bg-[#dadde0] cursor-pointer mb-4 text-sm hover:bg-[#bdc0c5] transition duration-300 rounded-md"
              onClick={() => navigate("/forgot-password", { state: { email: formData.emailId } })}
            >
              Forgot Password?
            </button>
            
            )}

            <div className="flex mt-5 gap-4">
              <button type="submit" className="w-full p-3 bg-[#008080] cursor-pointer mb-4 text-sm hover:bg-[#283e3e] transition duration-300 rounded-md" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              <button type="button" onClick={handleRegister} className="w-full p-3 bg-[#44266c] cursor-pointer mb-4 text-sm hover:bg-[#261d32] transition duration-300 rounded-md">
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="flex-1 hidden md:block relative min-w-[300px] h-full">
          <video ref={videoRef} className="w-full h-full object-cover" autoPlay loop muted>
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
