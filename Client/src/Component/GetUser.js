import axios from 'axios';
import React, { useState, useEffect } from 'react'

function GetUser() {

    const [loading, setLoading] = useState(false);
    const [loading02, setLoading02] = useState(true);
    const [message, setMessage] = useState("")

    const [user, setUser] = useState({
        user_id: "",
        name: "",
        email: "",
        type: ""
    });

    const { user_id, name, email, type } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
        //
    };

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        await axios({
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),
            },
            url: `https://weddingspots.herokuapp.com/api/getUser`,
        })
            .then((response => {

                setUser(response.data.data)
                setLoading(true)
            }))
            .catch((error) => {
                setLoading(true)

                if (typeof error.response === 'undefined') {

                    alert("Server Down")
                }
                else {
                    alert(error.response.data.error.message)
                }
            })
    }

    const onSubmit = async e => {
        e.preventDefault();
        setLoading02(false);
        await axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),
            },
            url: `https://weddingspots.herokuapp.com/api/updateProfile`,
            data: {
                user_id: user.user_id,
                name: name,
                type: type
            }
        })
            .then((response => {
                setLoading02(true)
                setMessage(response.data.message)
            }))
            .catch((error) => {
                setLoading02(true)
                if (typeof error.response === 'undefined') {

                    alert("Server Down")
                }
                else {
                    alert(error.response.data.error.message)
                }
            })
    };

    return (
        <div className="container">

            <div className="py-4">

                <div className="row">
                    <div className="card shadow py-4 col-xl-6 mx-auto">

                        <h4 className="card-title text-center mb-4 mt-1">Profile
                            {!loading &&
                                <div className="spinner-border text-primary ms-3" role="status">
                                    <span className="sr-only"></span>
                                </div>}
                            {!loading02 &&
                                <div className="spinner-border text-primary ms-3" role="status">
                                    <span className="sr-only"></span>
                                </div>}
                        </h4>

                        <form onSubmit={e => onSubmit(e)}>


                            <div className="row mb-3">
                                <div className="col-sm-10 mx-auto">
                                    <input type="text" className="form-control" name="name" value={name} placeholder="Name" onChange={e => onInputChange(e)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-sm-10 mx-auto">
                                    <input type="email" className="form-control" name="email" value={email} placeholder="Email Address" onChange={e => onInputChange(e)} />
                                </div>
                            </div>


                            <div className="row mb-3">
                                <div className="col-sm-10 mx-auto">
                                    <select className="form-select" onChange={e => onInputChange(e)} required>
                                        {type === 3 &&
                                            <>
                                                <option value="3">Admin</option>
                                                <option value="1">User</option>
                                                <option value="2">Vendor</option>
                                            </>
                                        }
                                        {type === 2 &&
                                            <>
                                                <option value="2">Vendor</option>
                                                <option value="1">User</option>
                                            </>
                                        }
                                        {type === 1 &&
                                            <>
                                                <option value="1">User</option>
                                                <option value="2">Vendor</option>
                                            </>
                                        }
                                    </select>
                                    <span className="error text-warning">{message}</span>
                                </div>
                            </div>

                            <div className='row'>
                                <div className="col-sm-10 mx-auto">
                                    <div className="row">
                                        <div className="col-sm">
                                            <button className="btn btn-warning" type="submit">Update</button>
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

export default GetUser
