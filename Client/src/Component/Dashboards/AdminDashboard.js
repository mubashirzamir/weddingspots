import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ModalDelete from "../Layout/ModalDelete"
import ModalFeature from "../Layout/ModalFeature"
import "./AdminDashboard.css"
import ReactPaginate from "react-paginate"

const AdminDashboard = () => {

    const [helper, setHelper] = useState(0);

    const [venues, setVenue] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loading02, setLoading02] = useState(true);
    const [loading03, setLoading03] = useState(true);

    const [openModal01, setOpenModal01] = useState({
        status: false,
        venue_id: -1,
    });
    const [openModal02, setOpenModal02] = useState({
        status: false,
        venue_id: -1,
        isFeatured: ""
    });

    const [pageCount, setPageCount] = useState(0);
    let size = 5;

    useEffect(() => {
        loadVenues();
        //setTimeout(loadVenues, 5000);
        //console.log("Hello")
    }, []);

    const loadVenues = async (currentPage) => {
        console.log("Current page", currentPage)
        setHelper(currentPage)

        if (!currentPage) {
            currentPage = 0;
        }
        await axios.get(`http://localhost:3001/api/venues?page=${currentPage}&size=${size}`).then(response => {
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

    const deleteVenue = async venue_id => {
        setLoading02(false)
        await axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken"),),
            },
            url: 'http://localhost:3001/managerAPI/deleteVenue/' + venue_id,
        }).
            then((response => {
                setLoading02(true);
                console.log(response.data)
                loadVenues(helper);

            }))
            .catch((error) => {
                setLoading02(true);
                console.log(error.response.data)
            })

    }

    const featureVenue = async venue_id => {
        setLoading03(false)
        await axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken"),),
            },
            url: 'http://localhost:3001/adminAPI/toggleFeaturedVenue/' + venue_id,
        }).
            then((response => {
                setLoading03(true);
                console.log(response.data)
                loadVenues(helper);

            }))
            .catch((error) => {
                setLoading03(true);
                console.log(error.response.data)
            })

    }

    const handlePageClick = async (data) => {
        console.log(data.selected)
        let currentPage = data.selected
        loadVenues(currentPage)
    }

    return (
        <div class="container">
            <div className="py-4">

                <div class="row mb-3">
                    <div class="col-sm">
                        <h1>Manage Venues</h1>
                    </div>
                    <div class="col-sm">
                        <div class="text-end">
                            <Link class="btn btn-primary" to={"venue/add"}>Add Venue</Link>
                        </div>
                    </div>
                </div>

                {(!loading && !loading02 && loading03) &&
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>

                }

                <table class="table shadow mb-3">
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
                                            <img class="img-thumbnail" style={{ width: 100, height: 100 }}
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

                                        <div className='btn-group'>

                                            <Link class="btn btn-primary me-2" to={`/venue/${venue.venue_id}`}>View</Link>
                                            <Link class="btn btn-outline-primary me-2" to={`/venue/edit/${venue.venue_id}`}>Edit</Link>

                                            {venue.isFeatured ?
                                                <button style={{ minWidth: 100 }} class="btn btn-warning me-2" onClick={() => setOpenModal02({ status: true, venue_id: venue.venue_id, isFeatured: true })}>Unfeature</button> :
                                                <button style={{ minWidth: 100 }} class="btn btn-warning me-2" onClick={() => setOpenModal02({ status: true, venue_id: venue.venue_id, isFeatured: false })}>Feature</button>
                                            }

                                            <button class="btn btn-danger" onClick={() => setOpenModal01({ status: true, venue_id: venue.venue_id })}>Delete</button>
                                            {/*<button class="btn btn-danger me-2" onClick={() => deleteVenue(venue.venue_id)}>Delete</button>*/}

                                        </div>

                                    </td>
                                </tr>

                            ))

                        }


                    </tbody>
                </table>

                {openModal01.status && <ModalDelete modalInfo={openModal01} modalHandler={setOpenModal01} deleteVenue={deleteVenue} />}
                {openModal02.status && <ModalFeature modalInfo={openModal02} modalHandler={setOpenModal02} featureVenue={featureVenue} />}


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


export default AdminDashboard