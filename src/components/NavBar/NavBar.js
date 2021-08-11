import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../image/Logo.png'
import './NavBar.css'

const NavBar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    return (
        <div>
            <header>
                <img className="logo" src={logo} alt="#" />
                <nav>
                    <ul className="nav-link">
                        <li>
                            <Link className="nav-li" to="/home">Home</Link>
                        </li>
                        <li>
                            <Link className="nav-li" to="/orders">Orders</Link>
                        </li>
                        <li>
                            <Link className="nav-li" to="/admin">Admin</Link>
                        </li>
                        <li>
                            <Link className="nav-li" to="/dealse">Deals</Link>
                        </li>
                    </ul>
                </nav>
                <Link to='/login'>  <button style={{ borderRadius: '20px' }}>{loggedInUser.email ? loggedInUser.name : 'Login'}</button> </Link>
            </header>
            <div className="search-wrap">
                <div className="search-box">
                    <input type="text" className="input" placeholder="Search.." />
                    <div className="search-btn">
                        <button>Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;