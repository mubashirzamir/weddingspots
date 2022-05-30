import React, { useState, useContext } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import { AuthContext } from "../../Helpers/AuthContext";

const AddReview = ({ onButtonPressChange }) => {

    const { venue_id } = useParams();

    const { authState } = useContext(AuthContext)

    const [warning, setWarning] = useState(false);


    const [loading, setLoading] = useState(true);

    const [rating, setRating] = useState(0)

    const [review, setReview] = useState({
        review_text: "",
    })

    const { review_text } = review;

    const onInputChange = e => {
        setReview({ ...review, [e.target.name]: e.target.value })
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (rating === 0) {
            setWarning(true);
        }

        else {
            setWarning(false);
            setLoading(false);
            await axios({
                method: 'post',
                headers: {
                    'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken")),
                },
                url: `https://weddingspots.herokuapp.com/api/venues/addreview`,
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
                if (typeof error.response === 'undefined') {

                    alert("Server Down")
                }
                else {
                    alert(error.response.data.error.message)
                }
            })
        }

    }

    const ratingChanged = (newRating) => {
        setRating(newRating);
    }

    return (
        <div>

            <form onSubmit={e => onSubmit(e)}>

                <div className="shadow-sm">
                    <textarea className="form-control" rows="3" name="review_text" value={review_text} onChange={e => onInputChange(e)} placeholder="Leave a review..." required></textarea>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <div>
                            <ReactStars
                                classNames={"px-1"}
                                count={5}
                                onChange={newRating => {
                                    ratingChanged(newRating)
                                }}
                                size={20}
                                activeColor="#ffd700"
                            />

                            {warning && <span className="error text-danger">Please fill out the rating</span>}
                        </div>
                    </div>

                    <div className="col">
                        <div className="mt-2">

                            {authState.status ?
                                <div>
                                    <button className="btn btn-primary me-2 float-end" type="submit">
                                        Post
                                    </button>
                                </div>
                                :
                                <div>
                                    <Link className="btn btn-primary me-2 float-end" to="/login">
                                        Post
                                    </Link>
                                </div>
                            }

                            {!loading &&
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            }

                        </div>
                    </div>
                </div>





            </form >

        </div >



    )
}

export default AddReview