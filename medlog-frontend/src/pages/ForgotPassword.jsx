import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Notification from "../Components/Notification";
import { useEffect } from "react";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
    const emailFromState = location.state?.email || ""; // Get email from location state
    useEffect(() => {
    if (emailFromState) {
        setEmail(emailFromState);
    }
  }, [emailFromState]);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleReset = async () => {
    if (!email) {
      setNotification({
        isOpen: true,
        title: "Error",
        message: "Please enter your email.",
        type: "error",
      });
      return;
    }

    if (!validateEmail(email)) {
      setNotification({
        isOpen: true,
        title: "Error",
        message: "Please enter a valid email address.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });

      if (data.success) {
        setNotification({
          isOpen: true,
          title: "Success",
          message: "A reset link has been sent to your email.",
          type: "success",
        });
        // setTimeout(() => {
        //   navigate("/verify-otp", { state: { email } });
        // }, 2000);
      } else {
        setNotification({
          isOpen: true,
          title: "Error",
          message: "Email not found in our database.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        isOpen: true,
        title: "Error",
        message: error.response?.data?.message || "Server error. Try again later.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <section className="flex justify-center items-center h-full w-full">
      <div className="flex w-[800px] max-w-[90%] bg-white/10 shadow-md rounded-md text-white">
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h2 className="text-center text-xl mb-5 font-bold text-teal-400">Reset Your Password</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="mb-1 block font-bold">Email Address</label>
            <input
              className="w-full p-3 mb-4 rounded-md bg-white/20 text-white"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              onClick={handleReset}
              disabled={loading}
              className="w-full p-3 bg-[#008080] cursor-pointer mb-4 text-sm hover:bg-[#283e3e] transition duration-300 rounded-md"
            >
              {loading ? "Sending Link..." : "Send Reset Link"}
            </button>

            <button
              type="button"
              onClick={handleBack}
              className="w-full p-3 bg-gray-600 cursor-pointer text-sm hover:bg-gray-700 transition duration-300 rounded-md"
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>

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

export default ForgotPassword;
