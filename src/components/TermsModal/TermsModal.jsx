import React from "react";
import "./TermsModal.css";

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 style={{color:"red"}}>Terms & Conditions</h3>
        <div className="terms-list">
          <ul>
            <li>1. All sales are final; no refunds after purchase.</li>
            <li>2. We ensure product quality but are not responsible for third-party delivery issues.</li>
            <li>3. Personal data is protected and not shared without consent.</li>
            <li>4. Orders cannot be modified once confirmed.</li>
            <li>5. Discounts and offers may change without prior notice.</li>
            <li>6. We reserve the right to change these terms at any time.</li>
            <li>7. Customers are responsible for their account and login information.</li>
            <li>8. All intellectual property rights on the website remain with [Your Business Name].</li>
            <li>9. We are not responsible for any damages caused by the misuse of the website.</li>
            <li>10. Disputes will be handled according to the laws of [Location].</li>
          </ul>
        </div>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default TermsModal;
