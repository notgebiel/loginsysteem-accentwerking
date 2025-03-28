import React from "react";
import NavBar from "../components/navbar";
import { useState } from "react";

const ResetPassword = () => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
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
            <form onSubmit={handleForgotPassword}>
                <input type="email" placeholder="e-mailadres" onChange={(e) => setEmail(e.target.value)}/>
                <input type="submit" value="Wachtwoord resetten" />
            </form>
        </div>
    )
};

export default ResetPassword;