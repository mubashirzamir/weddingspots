import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactPaginate from "react-paginate"

const FeaturedVenues = () => {

    const [venues, setVenue] = useState([]);
    const [loading, setLoading] = useState(false);

    const [pageCount, setPageCount] = useState(0);

    let size = 4;

    useEffect(() => {
        loadVenues();
    }, []);

    const loadVenues = async (currentPage) => {
        if (!currentPage) {
            currentPage = 0;
        }
        await axios.get(`https://weddingspots.herokuapp.com/api/venues?page=${currentPage}&size=${size}&isFeatured=true`).then(response => {


            const total = response.data.data.totalItems
            //total/size
            setPageCount(Math.ceil(total / size))
            setVenue(response.data.data.items)
            setLoading(true)
        }).catch(error => {
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
        loadVenues(currentPage)
    }

    return (
        <div>
            <div className="container">
                <div className="py-4">

                    <div className='mb-3 text-center'>
                        <h1>Featured</h1>
                    </div>

                    {!loading &&
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span>
                        </div>
                    }

                    <div className="row d-flex justify-content-center mb-3">
                        {venues.map((venue) => {
                            return (
                                <div key={venue.venue_id} className="col-sm-6 col-md-3 v my-2">
                                    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/venue/${venue.venue_id}`}>
                                        <div className="card shadow-sm w-100">
                                            <img src={venue.image_thumb} className="card-img-top mx-auto d-block" alt="..." style={{ width: 300, height: 200 }} />
                                            <div className="card-body">
                                                <h5 className="card-title text-left h3">{venue.name}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted text-left">
                                                    {venue.city}, {venue.area}
                                                </h6>
                                                <p className="card-subtitle text-muted text-left">{venue.price_per_head} PKR/Head</p>
                                                <p className="btn btn-outline-primary text" style={{ float: 'right' }} to={`/venue/${venue.venue_id}`}>View</p>

                                            </div>

                                        </div>
                                    </Link>


                                </div>
                            );
                        })}
                    </div>


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
        </div>


    )

}


export default FeaturedVenues
