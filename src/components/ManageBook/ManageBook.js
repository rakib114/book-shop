import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

const ManageBook = () => {
    const [allBooks, setAllBooks] = useState([]);
    useEffect(() => {
        const url = "https://blooming-wave-92908.herokuapp.com/books"
        fetch(url)
            .then(res => res.json())
            .then(data => setAllBooks(data))
    }, [])
    return (
        <div className="container mt-5 ">
            <table className="table border shadow table-borderless">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Book Name</th>
                        <th scope="col">Author Name</th>
                        <th scope="col">Price</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        allBooks.length === 0 && <div className="spinner-grow spinner-grow-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }

                    {
                        allBooks.map((book, index) => (
                            <tr>
                                <th scope="row">{index}</th>
                                <td>{book.bookName}</td>
                                <td>{book.authorName}</td>
                                <td> ${book.price}</td>
                                <td>
                                    <Link className="btn btn-primary mx-2"> <FontAwesomeIcon icon={faEdit} /></Link>
                                    <Link className="btn btn-danger "> <FontAwesomeIcon icon={faTrashAlt} /></Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageBook;