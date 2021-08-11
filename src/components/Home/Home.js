import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Book from '../Book/Book';
import NavBar from '../NavBar/NavBar';


const Home = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const url = "https://blooming-wave-92908.herokuapp.com/books"
        fetch(url)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])
    return (
        <div className="row  container-fluid " >
            <NavBar></NavBar>

            {
                books.map(book => <Book key={book._id} book={book}></Book>)
            }
            {
                books.length === 0 && <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
        </div>
    );
};

export default Home;