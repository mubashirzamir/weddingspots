import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditUser = () => {

    let history = useHistory();

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

    const { user_id, name, email, type } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
        //console.log(e.target.value)
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
                'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken"),),
            },
            url: 'http://localhost:3001/adminAPI/updateUser',
            data: {
                user_id: user_id,
                name: name,
                email: email,
                type: type
            }
        })
            .then((response => {
                setLoading02(true)
                console.log(response.data)
                setMessage(response.data.message)
            }))
            .catch((error) => {
                setLoading02(true)
                console.log(error.response.data)
                setMessage(error.response.data.error.message)

            })
    };

    const loadUser = async () => {
        console.log("params_user_id", params_user_id)
        await await axios({
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken"),),
            },
            url: 'http://localhost:3001/adminAPI/getUsers/' + params_user_id,
        }).then(response => {
            if (response.data.data) {
                setLoading01(true)
                console.log(response.data.data)
                setUser(response.data.data);

            }
            else {
                setLoading01(true)
                setMessage02("No such user")
            }
        }).catch(error => console.log(error.response.data))
    }


    return (
        <div className="container">

            <div className="py-4">

                <div className="row mb-3">
                    <div className="col-sm">
                        <h1>Edit Venue</h1>
                    </div>
                    <div className="col-sm">
                        <div className="text-end">
                            <button className="btn btn-primary" onClick={() => history.goBack()}>Back</button>

                        </div>
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
                        <label for="inputText3" className="col-sm-2 col-form-label">ID</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputText3" name="user_id" value={user_id} onChange={e => onInputChange(e)} readOnly />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label for="inputText3" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputText3" name="name" value={name} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label for="inputText3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputText3" name="email" value={email} onChange={e => onInputChange(e)} />
                        </div>
                    </div>


                    <div className="row mb-3">
                        <label for="inputText3" className="col-sm-2 col-form-label">Type</label>
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