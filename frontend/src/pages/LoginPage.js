import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();

    const checkEmail = async () => {
        try {
            const { data } = await axios.post('/api/auth/check-email', { email });
            if (data.exists) {
                setIsEmailChecked(true);
            } else {
                history.push('/register', { email });
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('authToken', data.token);
            history.push('/');
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={isEmailChecked ? handleLogin : (e) => { e.preventDefault(); checkEmail(); }}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {isEmailChecked && (
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit">{isEmailChecked ? 'Login' : 'Next'}</button>
            </form>
        </div>
    );
};

export default LoginPage;