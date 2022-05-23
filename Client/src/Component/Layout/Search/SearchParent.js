import React, { useEffect } from 'react'
import Search from './Search'
import SearchResults from './SearchResults'

import { useLocation } from "react-router-dom";

const SearchParent = () => {

    const location = useLocation();

    useEffect(() => {
    }, [location]);

    return (
        <div>
            <Search />
            <div className='mt-4'>
                <SearchResults query={location.search} />
            </div>

        </div>
    )
}

export default SearchParent