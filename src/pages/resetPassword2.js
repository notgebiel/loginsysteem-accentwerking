import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ResetPasswordTwo = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!token) {
            setMessage('Geen token gevonden, probeer opnieuw');
            return;
        }

        const response = await fetch('http://localhost:3001/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({token, newPassword}),
        })

        const data = await response.json()
        setMessage(data.message || 'Interne fout.');
    }
    return (
        <div>
            <h1>Wachtwoord resetten</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="password" placeholder="Nieuw wachtwoord" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <button type="submit">Reset wachtwoord</button>
            </form>
        </div>
    )
}

export default ResetPasswordTwo;