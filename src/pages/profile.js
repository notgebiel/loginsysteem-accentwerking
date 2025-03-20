import React, { useEffect, useState } from "react";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const logout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/';
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            window.location.href = '/';
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