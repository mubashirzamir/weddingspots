import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Helpers/AuthContext";
import { useHistory } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {

    let history = useHistory();

    const { authState, setAuthState } = useContext(AuthContext)

    const [collapse, setCollapse] = useState(false);

    let roleName = "User"

    if (authState.type === 3) {
        roleName = "Admin"
    }

    else if (authState.type === 2) {
        roleName = "Manager"
    }


    const logout = () => {
        sessionStorage.removeItem("accessToken")
        setAuthState({
            user_id: "",
            email: "",
            name: "",
            type: "1",
            status: false
        })
        history.push("/")
    }

    const show = (collapse) ? "show" : "";

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-primary shadow-sm bg-white my-navbar">
            <div className="container">
                <Link className="navbar-brand my-navbar-brand" to="/">
                    weddingspots
                </Link>
                <button
                    className="navbar-toggler navbar-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setCollapse(!collapse)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={"collapse navbar-collapse " + show} id="navbarSupportedContent">
                    <ul className="navbar-nav nav-pills nav-fill ms-2 me-auto mb-2 mb-lg-0">

                        <li className="nav-item me-2">
                            <NavLink className="nav-link" aria-current="page" exact to="/">
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item me-2">
                            <NavLink className="nav-link" aria-current="page" exact to="/about">
                                About
                            </NavLink>
                        </li>


                        {authState.type === 2 && (
                            <li className="nav-item me-2">
                                <NavLink className="nav-link" aria-current="page" exact to="/managervenuelist">
                                    Manage Venues
                                </NavLink>
                            </li>
                        )}

                        {authState.type > 2 && (
                            <li className="nav-item me-2">
                                <NavLink className="nav-link" aria-current="page" exact to="/adminvenuelist">
                                    Manage Venues
                                </NavLink>
                            </li>
                        )}

                        {authState.type > 2 && (
                            <li className="nav-item me-2">
                                <NavLink className="nav-link" aria-current="page" exact to="/adminuserlist">
                                    Manage Users
                                </NavLink>
                            </li>
                        )}

                    </ul>
                </div>

                <div>


                    {!authState.status && (

                        <>

                            <Link className="btn btn-outline-secondary me-2 my-button" to="/login">
                                Login
                            </Link>

                            <Link className="btn btn-outline-secondary me-2 my-button" to="/register">
                                Register
                            </Link>

                        </>

                    )}

                    {authState.status && (
                        <>
                            <Link className="btn btn-outline-primary me-2 my-button" to="/getUser">{authState.name} ({roleName})</Link>
                            <button className="btn btn-outline-danger my-button" onClick={logout}>Logout</button>
                        </>
                    )}

                </div>



            </div>
        </nav >
    );
};

export default Navbar;
