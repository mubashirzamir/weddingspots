import React, { Component } from 'react'
import axios from 'axios'
import Social from './Layout/Social'

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            type: "1",
            name: "",
            email: "",
            password: "",
            registerStatus: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    typehandler = (event) => {
        this.setState({
            type: event.target.value
        })
    }

    namehandler = (event) => {
        this.setState({
            name: event.target.value
        })
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
        event.preventDefault();
        console.log(this.state);

        await axios({
            method: 'post',
            url: "http://localhost:3001/api/register",
            data: this.state
        })
            .then((response => {
                console.log(response.data.message)
                this.setState({
                    registerStatus: response.data.message
                })
                //history.push("/login")
            }))
            .catch((error) => {
                console.log(error.response.data)
                this.setState({
                    registerStatus: error.response.data.error.message
                })
            })

        /*try {

            fetch("http://localhost:3001/api/register", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }).then(response => response.json())
                .then((data) => {

                    if (data.errors) {
                        this.setState({
                            registerStatus: data.errors[0].msg
                        })
                    }

                    else {
                        this.setState({
                            registerStatus: data.message
                        })
                    }


                    console.log(data)
                });

        } catch (e) {
            console.log(e)
        }


        this.setState({
            name: "",
            email: "",
            password: "",
            registerStatus: ""
        })
        event.preventDefault()*/

    }


    render() {
        return (
            <div class="container">

                <div className="py-4">

                    <form onSubmit={this.handleSubmit}>

                        <h1>Register</h1>

                        <div class="row mb-3">
                            <label for="inputType3" class="col-sm-2 col-form-label">User Type</label>
                            <div class="col-sm-10">
                                <select class="form-control" value={this.state.type} onChange={this.typehandler} required>
                                    <option value="2">Manager</option>
                                    <option value="1">User</option>
                                </select>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="inputName3" class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputText3" value={this.state.name} onChange={this.namehandler} required />
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="inputEmail3" value={this.state.email} onChange={this.emailhandler} required />
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="inputPassword3" value={this.state.password} onChange={this.passwordhandler} required />
                            </div>
                        </div>

                        <div class="col-12">
                            <button class="btn btn-primary" type="submit">Register</button>
                        </div>

                    </form>

                    <br></br>
                    <h2>{this.state.registerStatus}</h2>

                    <Social />

                </div>

            </div>

        )
    }
}

export default Register