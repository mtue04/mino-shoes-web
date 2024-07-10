import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        history.push('/login'); // Redirect to login page after logout
    };

    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/login">Login</Link>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    );
};

export default Header;