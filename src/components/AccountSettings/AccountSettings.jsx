import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./AccountSettings.css";

const AccountSettings = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+1 234 567 890",
        avatar: null,
    });

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [addresses, setAddresses] = useState([
        { id: 1, text: "123 Main Street, New York, NY" },
        { id: 2, text: "456 Elm Street, Los Angeles, CA" },
    ]);

    const [orderHistory, setOrderHistory] = useState([
        { id: 1, date: "2023-10-01", total: 120.5, status: "Delivered" },
        { id: 2, date: "2023-09-25", total: 89.99, status: "Cancelled" },
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUser((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
        }
    };

    const handleDeleteAddress = (id) => {
        setAddresses(addresses.filter((address) => address.id !== id));
    };

    const handleUpdateProfile = () => {
        alert("Profile updated successfully!");
    };

    const handleChangePassword = () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        alert("Password updated successfully!");
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate("/login");
        alert("Logged out successfully!");
    };

    const handleDeleteAccount = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            setIsLoggedIn(false);
            navigate("/signup");
            alert("Account deleted successfully!");
        }
    };

    if (false) {
        return (
            <div className="not-logged-in">
                <h2>You are not logged in!</h2>
                <p>Please <Link to="/signup">sign up</Link> or <Link to="/login">log in</Link> to access your account.</p>
            </div>
        );
    }

    return (
        <motion.div className="account-settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2>Account Settings</h2>

            {/* Profile Section */}
            <motion.div className="profile-section" whileHover={{ scale: 1.02 }}>
                <h3>Profile Information</h3>
                <div className="avatar-upload">
                    <label htmlFor="avatar">
                        <img src={user.avatar || "https://via.placeholder.com/100"} alt="Avatar" className="avatar" />
                    </label>
                    <input type="file" id="avatar" accept="image/*" onChange={handleAvatarChange} />
                </div>
                <input type="text" name="name" value={user.name} onChange={handleInputChange} placeholder="Full Name" />
                <input type="email" name="email" value={user.email} readOnly disabled />
                <input type="tel" name="phone" value={user.phone} onChange={handleInputChange} placeholder="Phone Number" />
                <button className="update-btn" onClick={handleUpdateProfile}>Update Profile</button>
            </motion.div>

            {/* Change Password Section */}
            <motion.div className="password-section" whileHover={{ scale: 1.02 }}>
                <h3>Change Password</h3>
                <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={handlePasswordChange} placeholder="Current Password" />
                <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} placeholder="New Password" />
                <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} placeholder="Confirm Password" />
                <button className="update-btn" onClick={handleChangePassword}>Change Password</button>
            </motion.div>

            {/* Addresses Section */}
            <motion.div className="addresses-section" whileHover={{ scale: 1.02 }}>
                <h3>Manage Addresses</h3>
                {addresses.map((address) => (
                    <motion.div key={address.id} className="address-item" whileHover={{ scale: 1.05 }}>
                        <p>{address.text}</p>
                        <button className="delete-btn" onClick={() => handleDeleteAddress(address.id)}>Delete</button>
                    </motion.div>
                ))}
            </motion.div>

            {/* Order History Section */}
            <motion.div className="order-history-section" whileHover={{ scale: 1.02 }}>
                <h3>Order History</h3>
                {orderHistory.map((order) => (
                    <motion.div key={order.id} className="order-item" whileHover={{ scale: 1.05 }}>
                        <p><strong>Date:</strong> {order.date}</p>
                        <p><strong>Total:</strong> ${order.total}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Logout Section */}
            <motion.div className="logout-section" whileHover={{ scale: 1.02 }}>
                <h3>Logout</h3>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </motion.div>

            {/* Delete Account Section */}
            <motion.div className="delete-account-section" whileHover={{ scale: 1.02 }}>
                <h3>Delete Account</h3>
                <button className="delete-btn" onClick={handleDeleteAccount}>Delete My Account</button>
            </motion.div>
        </motion.div>
    );
};

export default AccountSettings;