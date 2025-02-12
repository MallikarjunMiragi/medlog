import React, { useState } from 'react';


const Support = () => {
  const [supportType, setSupportType] = useState('');
  const [detail, setDetail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ supportType, detail });
  };

  return (
    <div className="support-container">
      <h1>Logitbox [fits]</h1>
      <h2>Request support</h2>
      <p>Please fill in the details below to submit a support request. We will be in contact as soon as possible to resolve your issue.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="detail">Detail *</label>
          <textarea
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Support;