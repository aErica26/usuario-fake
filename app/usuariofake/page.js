"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../usuariofake/usuariofake.module.css'; 

const Home = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers(); 
    }, []);

    const fetchUsers = async (gender = '') => {
        setLoading(true);
        setError(null);
        try {
            const url = gender 
                ? `https://randomuser.me/api/?results=9&gender=${gender}` 
                : 'https://randomuser.me/api/?results=9';
            const response = await axios.get(url);
            setUsers(response.data.results);
        } catch (err) {
            setError('Failed to fetch users.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFetchNewUsers = (gender) => {
        fetchUsers(gender); 
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className={styles.error}>{error}</p>; 
    if (!users.length) return <p>No users found.</p>;

    return (
        <div className={styles.container}>
            <h1>User Profiles</h1>
            <div className={styles.userGrid}>
                {users.map(user => (
                    <div key={user.login.uuid} className={styles.userCard}>
                        <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
                        <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Location:</strong> {user.location.city}, {user.location.country}</p>
                        <p><strong>Date of Birth:</strong> {new Date(user.dob.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => handleFetchNewUsers('female')}>
                Fetch New Female Users
            </button>
            <button onClick={() => handleFetchNewUsers('male')}>
                Fetch New Male Users
            </button>
            <footer className={styles.footer}>
                <p>&copy; 2024 Feito com Amor</p>
                <p>
                    Follow us on{' '}
                    <a href="./Facebook.png" target="_blank" rel="noopener noreferrer">Facebook</a>,{' '}
                    <a href="./Instagram.png" target="_blank" rel="noopener noreferrer">Instagram</a>,{' '}
                    <a href="./Twitter.png" target="_blank" rel="noopener noreferrer">Twitter</a>.
                </p>
            </footer>
        </div>
    );
};

export default Home;