import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Helpers/AuthContext";
import { useHistory } from 'react-router-dom';

const Navbar = () => {

    let history = useHistory();

    const { authState, setAuthState } = useContext(AuthContext)

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

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link class="navbar-brand" to="/">
                    Venue Portal
                </Link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                        <li class="nav-item">
                            <NavLink className="nav-link" aria-current="page" exact to="/">
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" exact to="/about">
                                About
                            </NavLink>
                        </li>

                        {!authState.status && (

                            <>

                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" exact to="/register">
                                        Register
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" exact to="/login">
                                        Login
                                    </NavLink>
                                </li>



                            </>

                        )}

                        {authState.type === 2 && (
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" exact to="/managervenuelist">
                                    Manage Venues
                                </NavLink>
                            </li>
                        )}

                        {authState.type > 2 && (
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" exact to="/adminvenuelist">
                                    Manage Venues
                                </NavLink>
                            </li>
                        )}

                        {authState.type > 2 && (
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" exact to="/adminuserlist">
                                    Manage Users
                                </NavLink>
                            </li>
                        )}

                    </ul>
                </div>

                {authState.status && (
                    <>
                        <Link className="btn btn-outline-light me-2" to="/getUser">{authState.name} ({roleName})</Link>
                        <button className="btn btn-outline-light" onClick={logout}>Logout</button>
                    </>
                )}

            </div>
        </nav >
    );
};

export default Navbar;
