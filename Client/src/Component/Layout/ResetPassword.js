import axios from 'axios';
import React, { useEffect, useReducer, useState, } from "react";
import { useLocation } from "react-router-dom";
import qs from 'query-string';


const ResetPassword = () => {

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState();

    const location = useLocation();
    const token = qs.parse(location.search, { ignoreQueryPrefix: true }).token
    const email = qs.parse(location.search, { ignoreQueryPrefix: true }).email

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        setUser({
            ...user,
            email: email
        })
    }, [])

    const { password } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = async e => {
        e.preventDefault();

        setLoading(false)

        // await axios({
        //     method: 'post',
        //     url: `https://weddingspots.herokuapp.com/api/ResetPassword?token=${token}&email=${email}`,
        //     data: user
        // })
        //     .then((response => {
        //         setLoading(true)
        //         setMessage(response.data.message)
        //     }))
        //     .catch((error) => {
        //         setLoading(true)
        //         if (typeof error.response === 'undefined') {

        //             alert("Server Down")
        //         }
        //         else {
        //             alert(error.response.data.error.message)
        //         }
        //     })

    }


    return (
        <div className="container">

            <div className="py-4">

                <div className="row">
                    <div className="card shadow py-4 col-xl-6 mx-auto">

                        <h4 className="card-title text-center mb-4 mt-1">Reset Password
                            {!loading &&
                                <div className="spinner-border text-primary ms-3" role="status">
                                    <span className="sr-only"></span>
                                </div>}
                        </h4>


                        <form onSubmit={e => onSubmit(e)}>

                            <div className="row mb-3">
                                <div className="col-sm-10 mx-auto">
                                    <input type="email" className="form-control" name="email" value={user.email} readOnly />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-sm-10 mx-auto">
                                    <input type="password" className="form-control" name="password" value={password} onChange={e => onInputChange(e)} placeholder="Password" required />
                                </div>
                                <div className="col-sm-10 mt-1 mx-auto">
                                    <span className="error text-success">{message}</span>
                                </div>
                            </div>

                            <div className='row'>
                                <div className="col-sm-10 mx-auto">
                                    <div className="row">
                                        <div className="col-sm">
                                            <button className="btn btn-success" type="submit">Reset Password</button>
                                        </div>
                                    </div>
                                </div>
                            </div>




                        </form>

                    </div>
                </div>


            </div>

        </div>
    )
}

export default ResetPassword;