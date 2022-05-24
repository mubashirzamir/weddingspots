import React, { Component } from 'react'
//import './Component.css';

class GetUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userArray: [],
            userResult: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (event) => {

        try {

            fetch("http://localhost:3001/api/getUser", {
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json())
                .then((data) => {

                    if (data.user) {
                        this.setState({
                            userArray: data.user
                        })
                    }

                    else {
                        this.setState({
                            userResult: data.message
                        })
                    }


                    console.log(data)
                });

        } catch (e) {
            console.log(e)
        }

        event.preventDefault()

    }



    render() {

        return (
            <div class="container">

                <form onSubmit={this.handleSubmit}>

                    <h1>Get User</h1>
                    <input class="submitbtn" type="submit" value="Get User" />

                    <p>{this.state.userResult}</p>

                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                        {this.state.userArray.map((userArray) => (

                            <User
                                id={userArray.id}
                                name={userArray.name}
                                email={userArray.email}
                            />

                        ))}
                    </table>

                </form>

            </div>

        )
    }
}

const User = ({ id, name, email }) => (
    <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{email}</td>
    </tr>

);

export default GetUser