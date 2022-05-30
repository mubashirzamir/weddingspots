import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Booking(props) {

    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true);

    const { venue_id } = useParams();

    const [booking, setBooking] = useState({
        booking_date: "",
        booking_time: ""
    })

    const { booking_date, booking_time } = booking;

    const onInputChange = e => {
        setBooking({ ...booking, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setBooking({
            booking_date: new Date(),
            booking_time: "Day"
        })
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        await axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),
            },
            url: `https://weddingspots.herokuapp.com/api/venues/book/` + venue_id,
            data: booking
        }).
            then((response => {

                setMessage(response.data.message)
            }))
            .catch((error) => {

                if (typeof error.response === 'undefined') {

                    alert("Server Down")
                }
                else {
                    alert(error.response.data.error.message)
                }

            });
    }

    return (
        <div >

            <div>
                <div className="card mt-3 shadow-sm">
                    <p className="fw-bold text-center mt-2 mb-0">Book Request</p>

                    {!loading &&
                        <div className="spinner-border text-primary text-center ms-3" role="status">
                            <span className="sr-only"></span>
                        </div>}

                    <div className="mt-3 mb-3">

                        <form onSubmit={e => onSubmit(e)}>

                            <div className="row mb-4">
                                <div className="col-sm-10 mx-auto">
                                    <p className="fw-light text-center mt-0 mb-0 ">Which date would you like to book</p>
                                    <input type="date" className="form-control" name="booking_date" value={booking_date} onChange={e => onInputChange(e)} required />
                                </div>
                            </div>

                            <div className='row mb-4'>
                                <div className="col-sm-10 mx-auto">
                                    <p className="fw-light text-center mt-0 mb-0 ">Which time would you like to book</p>
                                    <span className="caret"></span>
                                    <select className="form-select" name="booking_time" value={booking_time} onChange={e => onInputChange(e)} required>
                                        <option value="Day">Day</option>
                                        <option value="Night">Night</option>
                                    </select>
                                </div>
                                <div className="col-sm-10 mx-auto mb-0 mt-0">
                                    <span className="error text-warning">{message}</span>
                                </div>

                            </div>

                            <div className='row'>
                                <p className='text-center'>
                                    <button className="col-sm-10 mx-auto btn btn-block btn-primary" type="submit">Request Booking</button>
                                </p>
                            </div>

                        </form>


                    </div>






                </div>
            </div>





        </div >
    )
}    
