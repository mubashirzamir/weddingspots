import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function GetUser() {

    let history = useHistory();

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        user_id: "",
        name: "",
        email: "",
        type: ""
    });

    const { user_id, name, email, type } = user;

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        await axios({
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),
            },
            url: "http://localhost:3001/api/getUser",
        })
            .then((response => {
                console.log(response.data)
                setUser(response.data.data)
                setLoading(true)
            }))
            .catch((error) => {
                setLoading(true)
                if (error.response.data.error.message) {
                    alert(error.response.data.error.message)
                }
            })
    }

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
                        </h4>

                        <div className="row mb-3">
                            <div className="col-sm-10 mx-auto">
                                <input type="text" className="form-control" name="name" value={name} placeholder="Name" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-sm-10 mx-auto">
                                <input type="email" className="form-control" name="email" value={email} placeholder="Email Address" />
                            </div>
                        </div>


                        <div className="row mb-3">
                            <div className="col-sm-10 mx-auto">
                                <select className="form-select" required>
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
                    </div>
                </div>



            </div>


        </div>
    )
}

export default GetUser
