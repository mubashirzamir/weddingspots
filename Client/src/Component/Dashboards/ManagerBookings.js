import React, { useState, useEffect } from 'react'
import ReactPaginate from "react-paginate"
import axios from 'axios'
import { useContext } from "react";
import { AuthContext } from "../../Helpers/AuthContext";

function ManagerBookings() {

    /*const location = useLocation();

    const [state, setState] = useState({
        name: location.state.name,
        city: location.state.city
    })

    const name = console.log(location.state.name)
    const city = console.log(location.state.city)*/

    let size = 3;
    const { authState, setAuthState } = useContext(AuthContext)
    const [loading01, setLoading01] = useState(false);
    const [bookings, setbooking] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading02, setLoading02] = useState(true);

    useEffect(() => {
        loadBookings();
        //setTimeout(loadBookings, 5000);
        //console.log("Hello")
    }, []);

    const loadBookings = async (currentPage) => {

        console.log("Current page", currentPage)
        if (!currentPage) {
            currentPage = 0;
        }
        await axios.get(`http://localhost:3001/managerAPI/bookings?page=${currentPage}&size=${size}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),
                }
            }).then(response => {
                console.log(response.data.data)
                const total = response.data.data.totalItems
                setPageCount(Math.ceil(total / size))
                setbooking(response.data.data.items)
                setLoading01(true)
            }).catch(error => {
                console.log(error.response.data)
            });

    }

    const approveBooking = async booking_id => {
        await axios({

            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),

            },
            url: 'http://localhost:3001/managerAPI/approveBooking/' + booking_id,
        }).
            then((response => {
                console.log(response)
                loadBookings();

            }))
            .catch((error) => {
                console.log(error)
            })

    }

    const refuseBooking = async booking_id => {
        await axios({

            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),

            },
            url: 'http://localhost:3001/managerAPI/refuseBooking/' + booking_id,
        }).
            then((response => {
                console.log(response)
                loadBookings();

            }))
            .catch((error) => {
                console.log(error)
            })

    }

    const handlePageClick = async (data) => {
        console.log(data.selected)
        let currentPage = data.selected
        loadBookings(currentPage)
    }


    return (
        <div className='container'>

            <div className='py-4'>

                <h1>Bookings</h1>
                <div>
                    <table class="table shadow mb-3">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Venue name</th>
                                <th scope="col">Booking Date</th>
                                <th scope="col">Booking Time</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings.map((booking, index) => (

                                    <tr>
                                        <th scope="row">{booking.venue_id}</th>
                                        <td>{booking.venue_name}</td>
                                        <td>{booking.booking_date}</td>
                                        <td>{booking.booking_time}</td>
                                        <td>{booking.status}</td>

                                        {
                                            (booking.status == 'Pending') ?

                                                <td>



                                                    <div className='btn-group'>
                                                        <button class="btn btn-primary me-2" onClick={() => approveBooking(booking.booking_id)}>Approve</button>
                                                        <button class="btn btn-danger me-2" onClick={() => refuseBooking(booking.booking_id)}>Refuse</button>
                                                    </div>
                                                </td>
                                                :
                                                <td><i>Response made</i></td>

                                        }

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

export default ManagerBookings