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
    let size = 10;

    useEffect(() => {
        loadVenues();
    }, []);

    const loadVenues = async (currentPage) => {

        setHelper(currentPage)

        if (!currentPage) {
            currentPage = 0;
        }
        await axios.get(`https://weddingspots.herokuapp.com/api/venues?page=${currentPage}&size=${size}`).then(response => {


            const total = response.data.data.totalItems
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

    const deleteVenue = async venue_id => {
        setLoading02(false)
        await axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),
            },
            url: `https://weddingspots.herokuapp.com/managerAPI/deleteVenue/` + venue_id,
        }).then((response => {
            setLoading02(true);

            loadVenues(helper);

        }))
            .catch((error) => {
                setLoading02(true);
                if (typeof error.response === 'undefined') {

                    alert("Server Down")
                }
                else {
                    alert(error.response.data.error.message)
                }
            })

    }

    const featureVenue = async venue_id => {
        setLoading03(false)
        await axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),
            },
            url: `https://weddingspots.herokuapp.com/adminAPI/toggleFeaturedVenue/` + venue_id,
        }).then((response => {
            setLoading03(true);
            loadVenues(helper);
        }))
            .catch((error) => {
                setLoading03(true);
                if (typeof error.response === 'undefined') {

                    alert("Server Down")
                }
                else {
                    alert(error.response.data.error.message)
                }
            })

    }

    const handlePageClick = async (data) => {

        let currentPage = data.selected
        loadVenues(currentPage)
    }

    return (
        <div className="container">
            <div className="py-4">

                <div className="row mb-3">
                    <div className="col-sm">
                        <h5>Manage Venues</h5>
                    </div>
                    <div className="col-sm">
                        <div className="text-end">
                            <Link className="btn btn-primary" to={"venue/add"}>Add Venue</Link>
                        </div>
                    </div>
                </div>

                {(!loading && !loading02 && loading03) &&
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>

                }

                <table className="table shadow mb-3">
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
                                    <td>{venue.area}</td>
                                    <td>{venue.type}</td>
                                    <td>{venue.halls}</td>
                                    <td>{venue.price_per_head}</td>
                                    <td>

                                        <div className='btn-group'>

                                            <Link className="btn btn-primary me-2" to={`/venue/${venue.venue_id}`}>View</Link>
                                            <Link className="btn btn-outline-primary me-2" to={`/venue/edit/${venue.venue_id}`}>Edit</Link>

                                            {venue.isFeatured ?
                                                <button style={{ minWidth: 100 }} className="btn btn-warning me-2" onClick={() => setOpenModal02({ status: true, venue_id: venue.venue_id, isFeatured: true })}>Unfeature</button> :
                                                <button style={{ minWidth: 100 }} className="btn btn-warning me-2" onClick={() => setOpenModal02({ status: true, venue_id: venue.venue_id, isFeatured: false })}>Feature</button>
                                            }

                                            <button className="btn btn-danger" onClick={() => setOpenModal01({ status: true, venue_id: venue.venue_id })}>Delete</button>
                                            {/*<button className="btn btn-danger me-2" onClick={() => deleteVenue(venue.venue_id)}>Delete</button>*/}

                                        </div>

                                    </td>
                                </tr>

                            ))

                        }


                    </tbody>
                </table>

                {openModal01.status && <ModalDelete modalInfo={openModal01} modalHandler={setOpenModal01} deleteVenue={deleteVenue} />}
                {openModal02.status && <ModalFeature modalInfo={openModal02} modalHandler={setOpenModal02} featureVenue={featureVenue} />}


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


export default AdminDashboard