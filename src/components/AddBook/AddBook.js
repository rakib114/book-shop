import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import './AddBook.css'

const AddBook = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imgUrl, setImgUrl] = useState(null);
    const onSubmit = data => {
        const eventData = {
            bookName: data.bookName,
            authorName: data.authorName,
            price: data.price,
            imageUrl: imgUrl
        };
        console.log(eventData);
        const url = `https://blooming-wave-92908.herokuapp.com/addBook`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(res => console.log('surver response', res))
    }

    const handleImageChange = (event) => {

        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '3eda1263bdfb0543143d549b38bd0edc');
        imageData.append('image', event.target.files[0])
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImgUrl(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className="shadow-sm p-3 mb-5 bg-body rounded">
            <h1>Add a New Book</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="container row col-md-3">
                <input name="bookName" defaultValue="Enter Book Name" {...register("bookName")} />
                <br />
                <input name="authorName" type="text" placeholder="Enter Author Name" {...register("authorName")} />
                <br />
                <input type="text" name="price" placeholder="Enter Price" {...register("price")} />
                <br />
                <input type='file' id="file" onChange={handleImageChange} />
                <label htmlFor="file"> <FontAwesomeIcon icon={faFileUpload} /> Upload Image</label>
                <br />
                <input type="submit" className="btn btn-primary" />
            </form>
        </div>
    );
};

export default AddBook;