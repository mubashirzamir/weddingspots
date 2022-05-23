import React from 'react'
import FeaturedVenues from './Layout/FeaturedVenues'
import Cities from './Layout/Cities'
import Search from './Layout/Search/Search'
import Gradient from '../Assets/Gradient.png'

function Home() {
    return (
        <div>
            <div>
                <div className="row position-relative d-flex align-items-center">
                    <div className="col text-center"> <img className='img-fluid' src={Gradient} alt="banner" /> </div>
                    <p className="col position-absolute"> <Search /> </p>
                </div>
            </div>

            <FeaturedVenues />
            <Cities />
        </div >
    )
}

export default Home
