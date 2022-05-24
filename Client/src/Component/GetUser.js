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
    });

    const { user_id, name, email } = user;

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
                    if (error.response.data.error.message === "jwt malformed") {
                        history.go(0);
                    }
                }
            })
    }

    return (
        <div className="container">

            <div className="py-4">

                <div className="row mb-3">
                    <h3>User</h3>
                </div>

                {!loading &&
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>

                }

                <table className="table shadow">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                    </tr>
                    <tr>

                        <td>{user_id}</td>
                        <td>{name}</td>
                        <td>{email}</td>

                    </tr>
                </table>
            </div>


        </div>
    )
}

export default GetUser
