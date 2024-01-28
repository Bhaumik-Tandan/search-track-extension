import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [user, setUser] = useState({});

    console.log(user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth/me');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogin = () => {
        chrome.tabs.create({ url: 'http://localhost:3000/auth/google', selected: true, active: true });
    };

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:3000/auth/logout');
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="h-screen">
            <div className="flex justify-center items-center py-44">
                    <button onClick={handleLogin} className="py-4 px-3 bg-red-500 text-white m-2">
                        Change google account
                    </button>
            </div>
        </div>
    );
}

export default Home;
