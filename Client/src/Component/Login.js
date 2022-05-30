import React, { useState } from "react";
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom';
import { useContext } from "react"
import { AuthContext } from '../Helpers/AuthContext'
import Social from "./Layout/Social";

const Login = () => {

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

        e.preventDefault();
        await axios({
            method: 'post',
            url: `https://weddingspots.herokuapp.com/api/login`,
            data: user
        })
            .then((response => {

                localStorage.setItem("accessToken", response.data.data.theToken)
                setAuthState({
                    user_id: response.data.data.user.user_id,
                    email: response.data.data.user.email,
                    name: response.data.data.user.name,
                    type: response.data.data.user.type,
                    status: true
                })

                setLoading(true)
                history.push("/")
            }))
            .catch((error) => {
                console.log(error.response);
                setLoading(true)

                if (typeof error.response === 'undefined') {

                    alert("Server Down")
                }
                else {
                    setMessage(error.response.data.error.message)
                }



            })

    }

    return (
        <div className="container">

            <div className="py-4">

                <div className="row">
                    <div className="card shadow py-4 col-xl-6 mx-auto">

                        <h4 className="card-title text-center mb-4 mt-1">Login
                            {!loading &&
                                <div className="spinner-border text-primary ms-3" role="status">
                                    <span className="sr-only"></span>
                                </div>}
                        </h4>

                        <form onSubmit={e => onSubmit(e)}>

                            <div className="row mb-3">
                                <div className="col-sm-10 mx-auto">
                                    <input type="email" className="form-control" name="email" value={email} onChange={e => onInputChange(e)} placeholder="Email Address" required />
                                </div>
                            </div>

                            <div className="row mb-2">
                                <div className="col-sm-10 mx-auto">
                                    <input type="password" className="form-control" name="password" value={password} onChange={e => onInputChange(e)} placeholder="Password" required />
                                </div>
                                <div className="col-sm-10 mt-1 mx-auto">
                                    <span className="error text-danger">{message}</span>
                                </div>
                            </div>


                            <div className='row'>
                                <div className="col-sm-10 mx-auto">
                                    <div className="row">
                                        <div className="col-sm">
                                            <button className="btn btn-primary" type="submit">Login</button>
                                        </div>

                                        <div className="col-sm text-end">
                                            <Link className="text-decoration-none" to="/ForgotPassword">Forgot password?</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>

                        <hr />
                        <Social />
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Login;