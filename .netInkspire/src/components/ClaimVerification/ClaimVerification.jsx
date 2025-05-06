import React, { useState } from 'react';
import './ClaimVerification.css';

export default function ClaimVerification() {
  const [claimCode, setClaimCode] = useState('');
  const [fulfilled, setFulfilled] = useState(false);

  const handleFulfill = () => {
    if (claimCode.trim()) {
      setFulfilled(true);
    }
  };

  return (
    <div className="claim-container">
      <div className="header-bar">
        <div className="logo">
          <span role="img" aria-label="book">📘</span> Inkspire
        </div>
        <button className="logout-btn">Logout</button>
      </div>

      <div className="claim-box">
        <h2>Claim Code Verification</h2>

        <label htmlFor="claimCode">Claim Code</label>
        <input
          id="claimCode"
          type="text"
          value={claimCode}
          onChange={(e) => setClaimCode(e.target.value)}
          placeholder="Enter claim code"
        />

        <div className="order-info">
          <strong>Order Info</strong>
          <p><span>Member Name:</span> John Smith</p>
          <p><span>Books Ordered</span></p>
          <ul>
            <li>The Silent Patient</li>
            <li>Educated</li>
          </ul>
        </div>

        <button onClick={handleFulfill} className="fulfill-btn">
          Mark as Fulfilled
        </button>

        {fulfilled && (
          <div className="success-msg">
            ✅ Order marked as fulfilled
          </div>
        )}
      </div>
    </div>
  );
}
