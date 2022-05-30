import axios from 'axios';
import dateFormat from 'dateformat';
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ReactStars from "react-rating-stars-component";
import { useParams } from 'react-router-dom';

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
        await axios.get(`https://weddingspots.herokuapp.com/api/venues/reviews?page=${currentPage}&size=${size}&venue_id=${venue_id}`).then(response => {
            const total = response.data.data.totalItems
            setPageCount(Math.ceil(total / size))
            setReview(response.data.data.items)
            setLoading(true)

        }).catch(error => {
            setLoading(true)
            if (typeof error.response === 'undefined') {

                alert("Server Down")
            }
            else {
                alert(error.response.data.error.message)
            }
        });
    }

    const handlePageClick = async (data) => {

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
            </span>

            <div className="row d-flex justify-content-center mt-3">
                {reviews.map((review) => {
                    return (
                        <div key={review.review_id} className="row v my-2">

                            <div className="card shadow-sm w-100">
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-9">
                                            <p className="">{review.review}</p>

                                        </div>

                                        <div className="col-3 col-xs-3">
                                            <p className="text-end">{dateFormat(review.date, "mmmm dS, yyyy")}</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <span className="fw-bold text-primary">{review.user.name} </span>
                                            <span className="float-end">
                                                <ReactStars
                                                    count={review.rating}
                                                    size={20}
                                                    edit={false}
                                                    color="#ffd700"
                                                />

                                            </span>
                                        </div>
                                    </div>

                                </div>

                            </div>



                        </div>
                    );
                })}
            </div>

            <div className="mt-3">

                {!(pageCount <= 1) &&
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
                }

            </div>






        </div >

    )

}

export default ReviewList
