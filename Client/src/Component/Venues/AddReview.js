import React, { useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const AddReview = ({ loadReview }) => {

    const { venue_id } = useParams();

    //console.log(venue_id)

    const [review, setReview] = useState({
        review_text: "",
        rating: ""
    })

    const { review_text, rating } = review;

    const onInputChange = e => {
        setReview({ ...review, [e.target.name]: e.target.value })
        //console.log(e.target.value)
    };

    const onSubmit = async e => {
        console.log(review);
        e.preventDefault();
        await axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken"),),
            },
            url: 'http://localhost:3001/api/venue/addreview',
            data: {
                venue_id: venue_id,
                review_text: review_text,
                rating: rating
            }
        });
        //conditions 
        loadReview()
        //history.push("/")
    }

    return (
        <div>

            <h1>Add Review</h1>

            <form onSubmit={e => onSubmit(e)}>

                <div>
                    <label for="exampleFormControlTextarea1" className="form-label">Review</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="review_text" value={review_text} onChange={e => onInputChange(e)} required></textarea>
                </div>

                <label className="mt-2 me-2" for="rating">Rating</label>

                <select name="rating" value={rating} required onChange={e => onInputChange(e)}>
                    <option value="">Please Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <div className="mt-2">
                    <button className="btn btn-primary" type="submit">Post</button>
                </div>

            </form >

        </div >



    )
}

export default AddReview