import React, { useState } from "react";
import CryptoJS from "crypto-js";

const ChangePassword = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('niet ingelogd');
        window.location.href = '/';
    }
    const [newPw, setNewPw] = useState('');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('userId');

    const change = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3001/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                newpassword: newPw,
            }),
        });
        const data = await response.json();
        console.log(data);
        if (data.message = "Wachtwoord gewijzigd") {
            window.location.href = '/';
        }
    }


    return (
        <div>
            <h1>Wachtwoord veranderen</h1>
            <form onSubmit={change}>
                <div>
                    <input type="password" placeholder="nieuw wachtwoord" onChange={(e) => setNewPw(CryptoJS.AES.encrypt(e.target.value, process.env.REACT_APP_CRYPTKEY).toString())}/>
                    <input type="submit" onSubmit={change} value="wachtwoord veranderen"/>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword;