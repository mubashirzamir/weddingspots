import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditUser = () => {


    const [message, setMessage] = useState("")
    const [message02, setMessage02] = useState("")

    const [loading01, setLoading01] = useState(false);
    const [loading02, setLoading02] = useState(true);

    const { params_user_id } = useParams();

    const [user, setUser] = useState({
        user_id: "",
        name: "",
        email: "",
        type: ""
    })

    const { name, type } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
        //
    };

    useEffect(() => {
        loadUser()
    }, [])

    const onSubmit = async e => {
        e.preventDefault();
        setLoading02(false);
        await axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),
            },
            url: `https://weddingspots.herokuapp.com/adminAPI/updateUser`,
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

    const loadUser = async () => {

        await await axios({
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),
            },
            url: `https://weddingspots.herokuapp.com/adminAPI/getUsers/` + params_user_id,
        }).then(response => {
            if (response.data.data) {
                setLoading01(true)

                setUser(response.data.data);

            }
            else {
                setLoading01(true)
                setMessage02("No such user")
            }
        }).catch(error => {
            if (typeof error.response === 'undefined') {

                alert("Server Down")
            }
            else {
                alert(error.response.data.error.message)
            }
        })

    }


    return (
        <div className="container">

            <div className="py-4">

                <div className="row mb-3">
                    <div className="col-sm">
                        <h5>Edit User</h5>
                    </div>
                </div>

                <h2>{message02}</h2>


                {!loading01 &&
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>

                }

                {!loading02 &&
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>

                }



                <form onSubmit={e => onSubmit(e)}>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">ID</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="user_id" value={user.user_id} readOnly />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="name" value={name} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" name="email" value={user.email} readOnly />
                        </div>
                    </div>


                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Type</label>
                        <div className="col-sm-10">
                            <select className="form-control" value={type} name="type" onChange={e => onInputChange(e)}>
                                <option value="3">Admin</option>
                                <option value="2">Manager</option>
                                <option value="1">User</option>
                            </select>
                        </div>
                    </div>


                    <div className="col-12">
                        <button className="btn btn-warning" type="submit">Update</button>
                    </div>



                </form>

                <br></br>
                <h2>{message}</h2>

            </div>

        </div >
    )

}

export default EditUser;