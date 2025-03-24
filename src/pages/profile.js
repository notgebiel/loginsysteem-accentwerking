import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavBar from "../components/navbar";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const logout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    }

    const changePassword = () => {
        navigate(`/change-password?userId=${user.id}`);
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.get('token')) {
            localStorage.setItem('authToken', urlParams.get('token'));
        }

        if (!token) {
            navigate('/')
            alert('Log eerst in');
            return;
        }

        const fetchProfile = async () => {
            const response = await fetch('http://localhost:3001/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data);
            }else {
                console.error(data.error);
            }
        };
        fetchProfile();
    }, [])

    if (!user) {
        return <div>Profiel laden...</div>
    }

    return (
        <div>
            <NavBar active="profiel" />
            <h1>Welkom, ingelogd met email {user.email}</h1>
            <p>Gebruiker id: {user.id}</p>
            <button onClick={logout}>Log uit</button>
            <button onClick={changePassword}>Wachtwoord wijzigen</button>

        </div>
    )
};

export default ProfilePage;