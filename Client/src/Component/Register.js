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

    }


    render() {
        return (
            <div className="container">

                <div className="py-4">

                    <div className='row'>
                        <div className='card shadow py-4 col-xl-6 mx-auto'>

                            <h4 class="card-title text-center mb-4 mt-1">Register</h4>

                            <form onSubmit={this.handleSubmit}>

                                <div className="row mb-3">
                                    <div className="col-sm-10 mx-auto">
                                        <select className="form-control" value={this.state.type} onChange={this.typehandler} required>
                                            <option value="2">Manager</option>
                                            <option value="1">User</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-10 mx-auto">
                                        <input type="text" className="form-control" id="inputText3" value={this.state.name} onChange={this.namehandler} placeholder="Name" required />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-10 mx-auto">
                                        <input type="email" className="form-control" id="inputEmail3" value={this.state.email} onChange={this.emailhandler} placeholder="Email Address" required />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-10 mx-auto">
                                        <input type="password" className="form-control" id="inputPassword3" value={this.state.password} onChange={this.passwordhandler} placeholder="Password" required />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="col-sm-10 mx-auto">
                                        <button className="btn btn-primary" type="submit">Register</button>
                                    </div>
                                </div>

                            </form>

                            <hr />


                            <Social />

                            <h2>{this.state.registerStatus}</h2>


                        </div >
                    </div >



                </div >

            </div >

        )
    }
}

export default Register