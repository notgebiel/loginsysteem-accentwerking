import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const logout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');

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
            <h1>Welkom, ingelogd met email {user.email}</h1>
            <p>Gebruiker id: {user.id}</p>
            <button onClick={logout}>Log uit</button>

        </div>
    )
};

export default ProfilePage;