import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5"; // Import Back Icon
import "./TermsModal.css";

const TermsModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [shake, setShake] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling when modal opens
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling when modal closes
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    e.stopPropagation(); 
    setShake(true);
    setShowWarning(true);

    setTimeout(() => setShake(false), 1500); 
  };

  const handleBack = () => {
    onClose();
    // navigate(-1);
  };

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Fixed Back Icon */}
        <div className={`fixed-back-icon ${shake ? "shake" : ""}`} onClick={handleBack}>
          <IoArrowBack />
          {showWarning && <p className="warning-text">Please go back before proceeding!</p>}
        </div>

        <h2 className="modal-title">Terms & Conditions</h2>

        <div className="terms-list">
          <ul>
            <li><strong>1. Acceptance of Terms:</strong> By using our website, you agree to abide by these Terms & Conditions.</li>
            <li><strong>2. Order & Payment:</strong> 
              <ul>
                <li>All sales are final; no refunds after purchase.</li>
                <li>Orders cannot be canceled or modified once confirmed.</li>
                <li>We accept payments via credit/debit cards, UPI, and digital wallets. Cash on delivery may be available for select locations.</li>
              </ul>
            </li>
            <li><strong>3. Product Information:</strong> 
              <ul>
                <li>We strive to ensure accurate product descriptions and images, but minor variations may occur.</li>
                <li>We do not guarantee stock availability for all products.</li>
              </ul>
            </li>
            <li><strong>4. Shipping & Delivery:</strong> 
              <ul>
                <li>Estimated delivery times vary based on location and availability.</li>
                <li>We are not responsible for delays caused by third-party logistics partners.</li>
                <li>Customers must provide accurate shipping details; we are not liable for incorrect addresses.</li>
              </ul>
            </li>
            <li><strong>5. Returns & Refunds:</strong> 
              <ul>
                <li>Returns are accepted only for damaged or incorrect items delivered.</li>
                <li>Refunds will be processed after verification and may take 5-7 business days.</li>
              </ul>
            </li>
          </ul>
        </div>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default TermsModal;
