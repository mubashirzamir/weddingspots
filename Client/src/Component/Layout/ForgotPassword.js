import React, { useState } from "react";
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom';
import { useContext } from "react"
import { AuthContext } from '../../Helpers/AuthContext'

const ForgotPassword = () => {

    const [loading, setLoading] = useState(true);

    let history = useHistory();

    const { authState, setAuthState } = useContext(AuthContext)
    const [message, setMessage] = useState("")

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const { email, password } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = async e => {
        setLoading(false)
        console.log(user);
        e.preventDefault();
        await axios({
            method: 'post',
            url: "http://localhost:3001/api/login",
            data: user
        })
            .then((response => {
                console.log(response.data)
                sessionStorage.setItem("accessToken", response.data.data.theToken)
                setAuthState({
                    user_id: response.data.data.user.user_id,
                    email: response.data.data.user.email,
                    name: response.data.data.user.name,
                    type: response.data.data.user.type,
                    status: true
                })
                console.log("AuthState", authState)
                setLoading(true)
                history.push("/")
            }))
            .catch((error) => {
                setLoading(true)
                console.log(error.response.data)
                setMessage(error.response.data.error.message)
            })

    }


    return (
        <div className="container">

            <div className="py-4">

                <div className="row">
                    <div className="card shadow py-4 col-xl-6 mx-auto">

                        <h4 class="card-title text-center mb-4 mt-1">Forgot Password?
                            {!loading &&
                                <div className="spinner-border ms-3" role="status">
                                    <span className="sr-only"></span>
                                </div>}
                        </h4>

                        <div className='row'>
                            <div className="col-sm-10 mx-auto">
                                <div className="row">
                                    <div className="row mb-3">
                                        <div className="ms-2 text-center">
                                            Please enter your email address. You will receive an email message with instructions on how to reset your password.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <form onSubmit={e => onSubmit(e)}>

                            <div className="row mb-3">
                                <div className="col-sm-10 mx-auto">
                                    <input type="email" className="form-control" id="inputText3" name="email" value={email} onChange={e => onInputChange(e)} placeholder="Email Address" required />
                                </div>
                            </div>

                            <div className='row'>
                                <div className="col-sm-10 mx-auto">
                                    <div className="row">
                                        <div className="col-sm">
                                            <button className="btn btn-success" type="submit">Get New Password</button>
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

export default ForgotPassword;