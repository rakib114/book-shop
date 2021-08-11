import React from 'react';
import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Book = ({ book }) => {
    const history = useHistory()
    const [booksUrl, setBooksUlr] = useState({});
    const hanldeAddbook = (id) => {
        setBooksUlr(id);
        history.push('/dealse')
    }
    return (
        <div className="col-md-4 d-flex justify-content-evenly" >
            <Card className="shadow p-3 mb-5 bg-body rounded" style={{ width: '17rem' }}>
                <Card.Img className="shadow-sm p-3 mb-5 bg-body rounded" variant="top" src={book.imageUrl} />
                <Card.Body>
                    <Card.Title>{book.bookName}</Card.Title>
                    <Card.Text>
                        {book.authorName}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                        <h3 className="text-primary" >${book.price}</h3>
                        <Button variant="primary" onClick={() => hanldeAddbook(book._id)}>Buy Now</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Book;