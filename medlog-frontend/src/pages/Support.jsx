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
    <div className="support-container text-white">
      <h1 className='text-[#a9d0cd] text-xl font-bold text-center font-[cursive]'>Logitbox [fits]</h1>
      <h2 className='text-lg font-bold mb-4'>Request support</h2>
      <p className='text-center text-teal-100'>Please fill in the details below to submit a support request. We will be in contact as soon as possible to resolve your issue.</p>
      <form onSubmit={handleSubmit} className='gap-4 [&>div]:flex [&>div]:flex-col [&_label]:mb-1.5 [&_label]:font-bold [&_textarea]:p-3 [&_textarea]:mb-4 [&_textarea]:rounded-md [&_textarea]:border-0 [&_textarea]:bg-white/20 [&_textarea]:placeholder:text-gray-300 [&_select]:p-3 [&_select]:rounded-md [&_select]:border [&_select]:border-gray-300 [&_select]:text-gray-300 [&_select]:bg-white/20 [&_select]:mb-4 [&_option]:bg-gray-700'>
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