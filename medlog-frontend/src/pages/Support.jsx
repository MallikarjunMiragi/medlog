import React, { useState } from 'react';
import { useSelector } from "react-redux";

const Support = () => {
  const [supportType, setSupportType] = useState('');
  const [detail, setDetail] = useState('');

  // ✅ Get logged-in user data from Redux
  const user = useSelector((state) => state.auth.user);
  const studentName = user?.fullName;
  const email = user?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Guard against missing user
    if (!studentName || !email) {
      alert("User details not found. Please login again.");
      return;
    }

    const payload = {
      studentName,
      email,
      supportType,
      detail,
    };

    try {
      const res = await fetch('http://localhost:5000/api/support/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('Support request submitted successfully!');
        setSupportType('');
        setDetail('');
      } else {
        alert('Failed to submit support request');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="support-container text-white">
      <h2 className='text-lg font-bold mb-4'>Request support</h2>
      <p className='text-center text-teal-100'>Please fill in the details below to submit a support request. We will be in contact as soon as possible to resolve your issue.</p>
      <form 
        onSubmit={handleSubmit} 
        className='gap-4 [&>div]:flex [&>div]:flex-col [&_label]:mb-1.5 [&_label]:font-bold [&_textarea]:p-3 [&_textarea]:mb-4 [&_textarea]:rounded-md [&_textarea]:border-0 [&_textarea]:bg-white/20 [&_textarea]:placeholder:text-gray-300 [&_select]:p-3 [&_select]:rounded-md [&_select]:border [&_select]:border-gray-300 [&_select]:text-gray-300 [&_select]:bg-white/20 [&_select]:mb-4 [&_option]:bg-gray-700'
      >
        <div>
          <label htmlFor="support-type">Support type *</label>
          <select
            id="support-type"
            value={supportType}
            onChange={(e) => setSupportType(e.target.value)}
            required
          >
            <option value="">Select an option</option>
            <option value="additional logbook category">Additional logbook category</option>
            <option value="bug report">Bug report</option>
            <option value="data protection report">Data protection report</option>
            <option value="email verification">Email verification</option>
            <option value="feedback">Feedback</option>
            <option value="general support">General support</option>
            <option value="hospital request">Hospital request</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="detail">Detail *</label>
          <textarea
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='w-full p-3 bg-[#008080] rounded-md cursor-pointer transition delay-300 hover:#015b5b'>Submit</button>
      </form>
    </div>
  );
};

export default Support;



// import React, { useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const Support = () => {
//   const [query, setQuery] = useState("");

//   // ✅ Get user from Redux store
//   const user = useSelector((state) => state.auth.user);
//   const studentEmail = user?.email;
//   const studentName = user?.fullName;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ Guard against empty
//     if (!studentEmail || !studentName) {
//       alert("User details not found. Please log in again.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/support/submit", {
//         studentEmail,
//         studentName,
//         query,
//       });
//       alert("Query submitted!");
//       setQuery("");
//     } catch (error) {
//       alert("Failed to submit");
//     }
//   };


//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Describe your issue..."
//       />
//       <button type="submit">Submit Query</button>
//     </form>
//   );
// };


// export default Support;
