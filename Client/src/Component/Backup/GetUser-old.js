import React, { Component } from 'react'


class GetUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: "",
            name: "",
            email: "",
            userResult: "",
        }

    }

    render() {


        try {

            fetch("http://localhost:3001/api/getUser", {
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken"),),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json())
                .then((data) => {

                    if (!data.id) {
                        this.setState({
                            actionStatus: data.message
                        })
                    }

                    else {
                        this.setState({
                            id: data.id,
                            name: data.name,
                            email: data.email
                        })
                    }


                    console.log(data)
                });

        } catch (e) {
            console.log(e)
        }

        return (
            <div class="container">

                <div className="py-4">

                    <h1>Get User</h1>

                    <p className="lead">{this.state.userResult}</p>

                    <table class="table shadow">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                        </tr>
                        <tr>

                            <td>{this.state.id}</td>
                            <td>{this.state.name}</td>
                            <td>{this.state.email}</td>

                        </tr>
                    </table>
                </div>



            </div>

        )
    }
}

export default GetUser