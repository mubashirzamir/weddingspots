import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>

            <div class="container">
                <footer class="row row-cols-4 py-4 border-top">
                    <div class="col">
                        <a href="/" class="d-flex align-items-center mb-3 link-dark text-decoration-none">
                            <svg class="bi me-2" width="40" height="32"></svg>
                        </a>
                        <p class="text-muted">© 2022 weddingspots Inc</p>
                    </div>

                    <div class="col">

                    </div>

                    <div class="col">
                        <h5>Links</h5>
                        <ul class="nav flex-column">
                            <li><Link className='nav-item nav-link mb-2 p-0 text-muted' to="/">Home</Link></li>
                            <li><Link className='nav-item nav-link mb-2 p-0 text-muted' to="/about">About</Link></li>
                            <li><Link className='nav-item nav-link mb-2 p-0 text-muted' to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div class="col">
                        <h5>Contact</h5>
                        <ul class="nav flex-column">
                            <li class="nav-item nav-link mb-2 p-0 text-muted">Phone: +92 313 2306986</li>
                            <li class="nav-item nav-link mb-2 p-0 text-muted">Email: info@weddingspots.pk</li>
                        </ul>
                    </div>

                </footer>
            </div>

        </div >
    )
}

export default Footer