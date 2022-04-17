import React, { Component } from 'react'
import axios from 'axios';

//import './Component.css';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            loginStatus: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    emailhandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }


    handleSubmit = async (event) => {

        console.log(this.state);

        //try {

        await axios({
            method: 'post',
            url: "http://localhost:3001/api/login",
            data: JSON.stringify(this.state)
        })
            .then((response => { console.log(response.data) }))
            .catch((error) => { console.log(error.response.data) })

        /*fetch("http://localhost:3001/api/login", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then((response => {
                console.log(response);
                this.setState({
                    loginStatus: response.data.data.message
                })
            }))
            .catch((error => {
                console.log(error.data);
                this.setState({
                    loginStatus: error.data.message
                })
            }))*/
        /*.then((data) => {

            if (data.errors) {
                this.setState({
                    loginStatus: data.errors[0].msg
                })
            }

            else if (!data.message) {
                sessionStorage.setItem("accessToken", data.token)

                this.setState({
                    loginStatus: "Logged in"
                })
            }

            else {
                this.setState({
                    loginStatus: data.message
                })
            }


            console.log(data)
        });*/

        //} catch (e) {
        //  console.log(e)
        //}


        this.setState({
            name: "",
            email: "",
            password: "",
            loginStatus: ""
        })

        event.preventDefault()

    }


    render() {

        return (
            <div class="container">

                <div className="py-4">

                    <form onSubmit={this.handleSubmit}>

                        <h1>Login</h1>

                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="inputEmail3" value={this.state.email} onChange={this.emailhandler} required />
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="inputPassword3" value={this.state.password} onChange={this.passwordhandler} placeholder="Password" required required />
                            </div>
                        </div>

                        <div class="col-12">
                            <button class="btn btn-primary" type="submit">Login</button>
                        </div>

                    </form>

                    <p className="lead">{this.state.loginStatus}</p>

                </div>

            </div>

        )
    }
}


export default Login