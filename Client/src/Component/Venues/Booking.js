import React, { useState, useEffect } from 'react';
import moment from 'moment';
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
        // console.log(dateState);
        // console.log(optionValue);

        // setbooking({
        //     booking_date: dateState,
        //     booking_time: optionValue
        // })

        // await axios({
        //     method: 'post',
        //     headers: {
        //         'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken"),),
        //     },
        //     url: 'http://localhost:3001/api/venues/book/' + venue_id,
        //     data: booking
        // }).
        //     then((response => {
        //         console.log(response.data)
        //         setMessage(response.data.message)
        //     }))
        //     .catch((error) => {
        //         console.log(error)
        //         //setMessage(error.response.data.error.message)

        //     });

        // //history.push("/")
    }

    return (
        <div >

            <div>
                <div className="card mt-3 shadow-sm">
                    <p className="fw-bold text-center mt-2 mb-0">Book Venue</p>

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
                            </div>

                            <div className='row'>
                                <p className='text-center'>
                                    <button className="col-sm-10 mx-auto btn btn-block btn-success">Check Availability</button>
                                </p>
                            </div>

                            <div className='row'>
                                <p className='text-center'>
                                    <button className="col-sm-10 mx-auto btn btn-block btn-primary" type="submit">Book</button>
                                </p>
                            </div>

                            {/* <div className='row mb-3'>
                            <div className="col-sm-10 mx-auto">
                                <p className='mb-0'>Selected Date: <b>{moment(booking_date).format('MMMM Do YYYY')}</b></p>
                                <p className="mb-0">Selected Time: <b>{booking_time}</b></p>
                            </div>
                        </div> */}

                        </form>


                    </div>






                </div>
            </div>





        </div >
    )
}    
