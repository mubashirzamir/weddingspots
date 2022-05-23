import React, { useState, useEffect } from 'react'
import Search from './Search'
import { Link, useLocation } from 'react-router-dom'
import ReactPaginate from "react-paginate"
import axios from 'axios'

function SearchResults(query) {


    let size = 5;

    const [loading01, setLoading01] = useState(false);
    const [venues, setVenue] = useState([]);
    const [pageCount, setPageCount] = useState(0);


    useEffect(() => {
        loadVenues();
        //setTimeout(loadVenues, 5000);
        //console.log("Hello")
    }, [query]);

    const loadVenues = async (currentPage) => {
        //console.log("Current page", currentPage)
        if (!currentPage) {
            currentPage = 0;
        }
        await axios.get(`http://localhost:3001/api/venues${query.query}&page=${currentPage}&size=${size}`).then(response => {
            console.log(response.data)
            console.log("total", response.data.data.totalItems)
            const total = response.data.data.totalItems
            setPageCount(Math.ceil(total / size))
            setVenue(response.data.data.items)
            setLoading01(true)
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


        <div className='container'>
            <div className='py-4'>

                <h1>Results</h1>
                <div>
                    <table className="table shadow mb-3">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">City</th>
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

                                    <tr key={venue.venue_id}>
                                        <th scope="row">{venue.venue_id}</th>
                                        <td>
                                            <div >
                                                <img className="img-thumbnail" style={{ width: 100, height: 100 }}
                                                    src={venue.image_thumb}
                                                    alt={venue.venue_id}
                                                    width={200} height={200}
                                                />
                                            </div>
                                        </td>
                                        <td>{venue.name}</td>
                                        <td>{venue.city}</td>
                                        <td>{venue.area}</td>
                                        <td>{venue.type}</td>
                                        <td>{venue.halls}</td>
                                        <td>{venue.price_per_head}</td>
                                        <td>

                                            <div className='btn-group'>
                                                <Link className="btn btn-primary me-2" to={`/venue/${venue.venue_id}`}>View</Link>
                                            </div>

                                        </td>
                                    </tr>

                                ))

                            }


                        </tbody>
                    </table>
                </div>


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
        </div>


    )
}

export default SearchResults
