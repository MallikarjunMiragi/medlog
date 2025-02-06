import React, { useState, useEffect } from "react";
import { FaTrash, FaCheckCircle } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles.css"; 

const AccountPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCountry] = useState(""); 
  const [profileImage, setProfileImage] = useState(null);
  const [memberSince] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUser) {
      setUserEmail(storedUser.email || "");
      setFirstName(storedUser.firstName || "");
      setSurname(storedUser.surname || "");
      setCountry(storedUser.country || "");
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = () => {
    localStorage.setItem(
      "userDetails",
      JSON.stringify({ email: userEmail, firstName, surname, country })
    );

    toast.success("Everything was saved successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="account-container">
      <ToastContainer />

      {/* Header */}
      <div className="account-header">
        <h2>Account Information</h2>
        <button className="delete-btn">
          <FaTrash /> Delete Account
        </button>
      </div>

      {/* Main Content */}
      <div className="account-content">
        {/* Profile Picture Upload */}
        <div className="profile-section">
          <label className="profile-picture">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-img" />
            ) : (
              <div className="upload-icon">
                <IoCloudUploadOutline />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
          <p>Click to upload</p>
        </div>

        {/* Account Details */}
        <div className="details-section">
          <p><strong>Member Since:</strong> {memberSince}</p>
          <p>
            <strong>Email:</strong> {userEmail} 
            <span className="badge verified"><FaCheckCircle /> Verified</span>
          </p>
          <p>
            <strong>Account Status:</strong>
            <span className="badge active"><FaCheckCircle /> Active</span>
          </p>
          <p><strong>Subscription Tier:</strong> Free</p>
          <p><strong>Subscription Renews:</strong> —</p>

          {/* Editable Fields */}
          <label>First Name*</label>
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label>Surname*</label>
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setSurname(e.target.value)}
            required
          />

          <label>Country</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            {["India", "USA", "Canada", "UK", "Germany", "Australia", "France", "Japan", "Brazil", "South Africa"].map(
              (c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              )
            )}
          </select>
          <p className="warning">
            Affects the format of dates and numbers on the website, mobile apps and generated reports.
          </p>

          <button className="update-btn" onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;