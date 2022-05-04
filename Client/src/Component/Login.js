import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from 'react-router-dom';
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

                <h1>Login</h1>

                {!loading &&
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>

                }

                <form onSubmit={e => onSubmit(e)}>

                    <div className="row mb-3">
                        <label for="inputText3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputText3" name="email" value={email} onChange={e => onInputChange(e)} required />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label for="inputText3" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputText3" name="password" value={password} onChange={e => onInputChange(e)} required />
                        </div>
                    </div>


                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Login</button>
                    </div>


                </form>

                <br></br>
                <h2>{message}</h2>
                <Social />
            </div>

        </div>
    )
}

export default Login;