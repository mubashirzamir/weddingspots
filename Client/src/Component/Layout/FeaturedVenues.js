import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactPaginate from "react-paginate"

const FeaturedVenues = () => {

    const [venues, setVenue] = useState([]);
    const [loading, setLoading] = useState(false);

    const [pageCount, setPageCount] = useState(0);

    let size = 6;

    useEffect(() => {
        loadVenues();
        //setTimeout(loadVenues, 5000);
        //console.log("Hello")
    }, []);

    const loadVenues = async (currentPage) => {
        if (!currentPage) {
            currentPage = 0;
        }
        await axios.get(`http://localhost:3001/api/venues?page=${currentPage}&size=${size}&isFeatured=true`).then(response => {
            console.log(response.data)
            console.log("total", response.data.data.totalItems)
            const total = response.data.data.totalItems
            //total/size
            setPageCount(Math.ceil(total / size))
            setVenue(response.data.data.venues)
            setLoading(true)
        }).catch(error => {
            console.log(error.response.data)
        });

    }

    const handlePageClick = async (data) => {
        console.log(data.selected)
        let currentPage = data.selected
        loadVenues(currentPage)
    }

    return (
        <div class="container">
            <div className="py-4">

                <div className='mb-3 text-center'>
                    <h1>Featured</h1>

                </div>

                {!loading &&
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>
                }

                <div className="row d-flex justify-content-center mb-3">
                    {venues.map((venue) => {
                        return (
                            <div key={venue.venue_id} className="col-sm-6 col-md-3 v my-2">
                                <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/venue/${venue.venue_id}`}>
                                    <div className="card shadow-sm w-100">
                                        <img src={venue.image_thumb} class="card-img-top mx-auto d-block" alt="..." style={{ width: 300, height: 200 }} />
                                        <div className="card-body">
                                            <h5 className="card-title text-left h3">{venue.name}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted text-left">
                                                {venue.city}, {venue.area}
                                            </h6>
                                            <p className="card-subtitle text-muted text-left">{venue.price_per_head} PKR/Head</p>
                                            <Link className="btn btn-outline-primary text" style={{ float: 'right' }} to={`/venue/${venue.venue_id}`}>View</Link>

                                        </div>

                                    </div>
                                </Link>


                            </div>
                        );
                    })}
                </div>

                {/*<table class="table shadow">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Area</th>
                            <th scope="col">Type</th>
                            <th scope="col">Halls</th>
                            <th scope="col">Price per head</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            venues.map((venue, index) => (

                                <tr>
                                    <th scope="row">{venue.venue_id}</th>
                                    <td>
                                        <div >
                                            <img class="img-thumbnail"
                                                src={venue.image_thumb}
                                                alt={venue.venue_id}
                                                width={200} height={200}
                                            />
                                        </div>
                                    </td>
                                    <td>{venue.name}</td>
                                    <td>{venue.area}</td>
                                    <td>{venue.type}</td>
                                    <td>{venue.halls}</td>
                                    <td>{venue.price_per_head}</td>
                                    <td>
                                        <Link class="btn btn-primary me-2" to={`/venue/${venue.venue_id}`}>View</Link>
                                    </td>
                                </tr>

                            ))

                        }


                    </tbody>
                    </table> */}


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
        </div >

    )

}


export default FeaturedVenues

/*const { authState } = useContext(AuthContext)

    return (
        <div>
            {authState.type === 3 ? <AdminDashboard /> : authState.type === 2 ? <ManagerDashboard /> : <UserDashboard />}
        </div >
    )*/

