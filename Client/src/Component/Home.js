import React, { useState } from 'react'
import FeaturedVenues from './Layout/FeaturedVenues'
import Search from './Layout/Search'

function Home() {

    return (
        <div>
            <Search />
            <FeaturedVenues />
        </div>
    )
}

export default Home
