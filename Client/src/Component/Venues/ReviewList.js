import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from "react-paginate"

const ReviewList = ({ buttonPress }) => {

    const [start, setStart] = useState(buttonPress);

    const { venue_id } = useParams();

    const [reviews, setReview] = useState([]);

    const [pageCount, setPageCount] = useState(0);
    let size = 5;

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setStart(buttonPress);
        loadReview();
    }, [buttonPress]);

    const loadReview = async (currentPage) => {
        if (!currentPage) {
            currentPage = 0;
        }
        await axios.get(`http://localhost:3001/api/venues/reviews?page=${currentPage}&size=${size}&venue_id=${venue_id}`).then(response => {
            const total = response.data.data.totalItems
            setPageCount(Math.ceil(total / size))
            setReview(response.data.data.items)
            setLoading(true)
            console.log(response.data.data)
        }).catch(error => {
            setLoading(true)
            console.log(error)
        });
    }

    const handlePageClick = async (data) => {
        console.log(data.selected)
        let currentPage = data.selected
        loadReview(currentPage)
    }

    return (

        <div>

            <span>
                {!loading &&
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>
                }
                <h5 className="d-inline">Review List</h5>
            </span>

            <table className="table shadow">
                <thead>
                    <tr>
                        {/*<th scope="col">Review ID</th>
                        <th scope="col">Venue ID</th>
                        <th scope="col">User ID</th>*/}
                        <th scope="col">ID</th>
                        <th scope="col">Date</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Review</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reviews.map((review, index) => (

                            <tr>
                                <td>{review.user_id}</td>
                                <td>{review.date}</td>
                                <td>{review.rating}</td>
                                <td>{review.review}</td>
                            </tr>

                        ))

                    }


                </tbody>
            </table>

            <ReactPaginate
                previousLabel={"Previous"}
                next={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-link"}
                nextClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />



        </div>

    )

}

export default ReviewList
