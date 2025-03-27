import React from "react";
import NavBar from "../components/navbar";

const resetPassword = () => {
    const handleForgotPassword = async (email) => {
        const response = await fetch('http://localhost:3001/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        })
        const data = await response.json();
        alert(data.message);
    }

    return (
        <div>
            <NavBar />
            <h1>Reset wachtwoord</h1>
        </div>
    )
};

export default resetPassword;