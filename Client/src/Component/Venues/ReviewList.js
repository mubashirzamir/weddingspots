import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import AddReview from "./AddReview";

const ReviewList = () => {

    const { venue_id } = useParams();

    const [reviews, setReview] = useState([]);


    useEffect(() => {
        loadReview();
        //console.log("Hello")
    }, []);

    const loadReview = async () => {
        const result = await axios.post("http://localhost:3001/api/venue/reviews", {
            venue_id: venue_id
        })
        console.log(result.data)
        console.log("Hi")
        setReview(result.data.review)
        console.log(result.data.review);
    }

    return (

        <div>

            <AddReview loadReview={loadReview} />

            <h1>Review List</h1>


            <table class="table shadow">
                <thead>
                    <tr>
                        {/*<th scope="col">Review ID</th>
                        <th scope="col">Venue ID</th>
                        <th scope="col">User ID</th>*/}
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Review</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reviews.map((review, index) => (

                            <tr>
                                {/*<th scope="row">{review.review_id}</th>
                                <td>{review.venue_id}</td>
                        <td>{review.user_id}</td>*/}
                                <td>{review.name}</td>
                                <td>{review.review_date}</td>
                                <td>{review.rating}</td>
                                <td>{review.review_text}</td>

                            </tr>

                        ))

                    }


                </tbody>
            </table>



        </div>

    )

}

export default ReviewList
