import axios from 'axios';
import React, { useState, useEffect } from 'react'

function GetUser() {

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
                'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken"),),
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
                alert(error.response.data.error.message)
                console.log(error.response.data)
            })
    }

    return (
        <div class="container">

            <div className="py-4">

                <h1>Get User</h1>

                {!loading &&
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>

                }

                <table class="table shadow">
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
