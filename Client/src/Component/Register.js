import React, { useState } from "react";
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import Social from './Layout/Social'
import passwordValidator from 'password-validator'

var schema = new passwordValidator();

schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
// .has().uppercase()                              // Must have uppercase letters
// .has().lowercase()                              // Must have lowercase letters
// .has().digits(2)                                // Must have at least 2 digits
// .has().not().spaces()                           // Should not have spaces
// .is().not().oneOf(['Passw0rd', 'Password123']);

const Register = () => {

    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(true);
    const [registerStatus, setRegisterStatus] = useState();
    const [passwordError, setPasswordError] = useState();

    let history = useHistory();

    const onSubmit = async (data) => {
        if (schema.validate(data.password)) {

            setLoading(false)
            await axios({
                method: 'post',
                url: `https://weddingspots.herokuapp.com/api/register`,
                data: data
            })
                .then((response => {

                    setLoading(true)
                    history.push("/login")
                }))
                .catch((error) => {
                    setLoading(true)

                    if (typeof error.response === 'undefined') {

                        alert("Server Down")
                    }
                    else {
                        setRegisterStatus(error.response.data.error.message)
                    }


                })

        }

        else {
            setPasswordError("Password must be at least 8 characters long")
        }

    }

    return (
        <div className="container">

            <div className="py-4">

                <div className='row'>
                    <div className='card shadow py-4 col-xl-6 mx-auto'>

                        <h4 className="card-title text-center mb-4 mt-1">Register
                            {!loading &&
                                <div className="spinner-border text-primary ms-3" role="status">
                                    <span className="sr-only"></span>
                                </div>}
                        </h4>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="row mb-3">
                                <div className="col-sm-10 mx-auto">
                                    <select  {...register('type', { required: true })} className="form-select" required>
                                        <option value="1">User</option>
                                        <option value="2">Vendor</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-sm-10 mx-auto">
                                    <input {...register('name', { required: true })} type="text" className="form-control" placeholder="Name" required />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-sm-10 mx-auto">
                                    <input {...register('email', { required: true })} type="email" className="form-control" placeholder="Email" required />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-sm-10 mx-auto">
                                    <input {...register('password', { required: true })} type="password" className="form-control" placeholder="Password" required />
                                </div>
                                <div className="col-sm-10 mt-1 mx-auto">
                                    <span className="error text-danger">{passwordError}</span>
                                    <span className="error text-danger">{registerStatus}</span>
                                </div>
                            </div>

                            <div className="col-sm-10 mx-auto">
                                <button className="btn btn-primary" type="submit">Register</button>
                            </div>

                        </form>

                        <hr />

                        <Social />

                    </div >
                </div>


            </div>

        </div>
    )
}

export default Register