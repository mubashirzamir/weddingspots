import React, { useState, useEffect } from 'react'
import ReactPaginate from "react-paginate"
import axios from 'axios'

function AdminBookings() {

    let size = 5;

    //const [loading01, setLoading01] = useState(false);
    const [bookings, setbooking] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async (currentPage) => {


        if (!currentPage) {
            currentPage = 0;
        }
        await axios.get(`http://localhost:3001/adminAPI/bookings?page=${currentPage}&size=${size}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),
                }
            }).then(response => {

                const total = response.data.data.totalItems
                setPageCount(Math.ceil(total / size))
                setbooking(response.data.data.items)
            }).catch(error => {
                if (typeof error.response === 'undefined') {

                    alert("Server Down")
                }
                else {
                    alert(error.response.data.error.message)
                }
            });

    }

    const rejectBooking = async booking_id => {
        await axios({

            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),

            },
            url: 'http://localhost:3001/adminAPI/rejectBooking/' + booking_id,
        }).
            then((response => {
                loadBookings();
            }))
            .catch((error) => {
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
        loadBookings(currentPage)
    }

    return (
        <div className='container'>

            <div className='py-4'>

                <h3>Bookings</h3>
                <div>
                    <table class="table shadow mb-3">
                        <thead>
                            <tr>
                                <th scope="col">Booking ID</th>
                                <th scope="col">User Email</th>
                                <th scope="col">Venue Name</th>
                                <th scope="col">Booking Date</th>
                                <th scope="col">Booking Time</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings.map((booking, index) => (

                                    <tr>
                                        <th scope="row">{booking.booking_id}</th>
                                        <td>{booking.user.email}</td>
                                        <td>{booking.venue_name}</td>
                                        <td>{booking.booking_date}</td>
                                        <td>{booking.booking_time}</td>
                                        <td>{booking.status}</td>

                                        <td>

                                            <div className='btn-group'>
                                                <button class="btn btn-danger me-2" onClick={() => rejectBooking(booking.booking_id)}>Admin reject</button>
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

export default AdminBookings