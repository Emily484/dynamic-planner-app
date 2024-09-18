import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Task List</Link></li>
                <li><Link to="/time-planner">Time Planner</Link></li>
                <li><Link to="/reflection">Reflection</Link></li>
                <li><Link to="/goals">Goals</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;