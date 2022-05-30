import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>

            <div className="container">
                <footer className="row row-cols-4 py-4 border-top">
                    <div className="col">
                        <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
                            <svg className="bi me-2" width="40" height="32"></svg>
                        </a>
                        <p className="text-muted">© 2022 weddingspots Inc</p>
                    </div>

                    <div className="col">

                    </div>

                    <div className="col">
                        <h5>Links</h5>
                        <ul className="nav flex-column">
                            <li><Link className='nav-item nav-link mb-2 p-0 text-muted' to="/">Home</Link></li>
                            <li><Link className='nav-item nav-link mb-2 p-0 text-muted' to="/about">About</Link></li>
                        </ul>
                    </div>

                    <div className="col">
                        <h5>Contact</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item nav-link mb-2 p-0 text-muted">Phone: +92 309 0826778</li>
                            <li className="nav-item nav-link mb-2 p-0 text-muted">Email: info@weddingspots.pk</li>
                        </ul>
                    </div>

                </footer>
            </div>

        </div >
    )
}

export default Footer