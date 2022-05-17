import React, { useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { GiTruce } from "react-icons/gi";

const AddReview = ({ onButtonPressChange }) => {

    const { venue_id } = useParams();

    const [loading, setLoading] = useState(true);

    const [review, setReview] = useState({
        review_text: "",
        rating: ""
    })

    const { review_text, rating } = review;

    const onInputChange = e => {
        setReview({ ...review, [e.target.name]: e.target.value })
    };

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(false);
        await axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken")),
            },
            url: 'http://localhost:3001/api/venues/addreview',
            data: {
                venue_id: venue_id,
                review: review_text,
                rating: rating
            }
        }).then(response => {
            setLoading(true)
            onButtonPressChange();
        }).catch(error => {
            setLoading(true)
            console.log(error)
        })

    }

    return (
        <div>

            <h5>Add Review</h5>

            <form onSubmit={e => onSubmit(e)}>

                <div>
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

                <div className="mt-2 mb-4">
                    <button className="btn btn-primary me-2" type="submit">Post</button>
                    {!loading &&
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span>
                        </div>
                    }

                </div>

            </form >

        </div >



    )
}

export default AddReview