import React from 'react';
import './AdminNavBar.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faThLarge, faEdit } from '@fortawesome/free-solid-svg-icons'

const AdminNavBar = () => {
    return (
        <div>
            <div className="wrapper">
                <div className="slidebar">
                    <Link to="/home"><h2>BOOK SHOP</h2></Link>
                    <ul>
                        <li><Link className="admin-nav" to="/manageBook" > <FontAwesomeIcon icon={faThLarge} />  Manage Book</Link></li>
                        <li><Link className="admin-nav" to="/addBook"> <FontAwesomeIcon icon={faPlus} />  Add Book</Link></li>
                        <li><Link className="admin-nav"> <FontAwesomeIcon icon={faEdit} /> Edit Book</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminNavBar;