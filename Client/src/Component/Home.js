import React from 'react'
import FeaturedVenues from './Layout/FeaturedVenues'
import Cities from './Layout/Cities'
import Search from './Layout/Search/Search'
import Gradient from '../Assets/Gradient.png'

function Home() {
    return (
        <div>

            <div>
                <div class="card border-0">
                    <img class="card-img-top" alt="banner" src={Gradient} />
                    <div class="card-img-overlay card-inverse d-flex align-items-center">
                        <p className='col mt-5'> <Search /> </p>
                    </div>
                </div>
            </div>

            <FeaturedVenues />
            <Cities />
        </div >
    )
}

export default Home
