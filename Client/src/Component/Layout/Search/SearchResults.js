import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ReactPaginate from "react-paginate"
import axios from 'axios'
import Slider from '@mui/material/Slider';
import qs from 'query-string';

function SearchResults(query) {

    let history = useHistory();

    let size = 10;

    const [loading, setLoading] = useState(false);
    const [venues, setVenue] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const [pageHelper, setPageHelper] = useState(0);


    const [sliderValue01, setSliderValues01] = useState([0, 10000]);
    const [sliderValue02, setSliderValues02] = useState([0, 10000]);

    const [queryHelper, setQueryHelper] = useState({
        city: "",
        name: "",
        type: "",
        min_cap: "",
        max_cap: "",
        min_price: "",
        max_price: ""
    })

    useEffect(() => {
        setQueryHelper(qs.parse(query.query));
        loadVenues();
    }, [query]);

    const loadVenues = async (currentPage) => {
        setLoading(false);
        if (!currentPage) {
            currentPage = 0;
        }
        await axios.get(`https://weddingspots.herokuapp.com/api/venues${query.query}&page=${currentPage}&size=${size}`).then(response => {
            const total = response.data.data.totalItems
            setPageCount(Math.ceil(total / size))
            setVenue(response.data.data.items)
            setLoading(true)
        }).catch(error => {
            if (typeof error.response === 'undefined') {

                alert("Server Down")
            }
            else {
                alert(error.response.data.error.message)
            }
        });

    }

    const handlePageClick = async (data) => {

        let currentPage = data.selected
        setPageHelper(currentPage);
        loadVenues(currentPage)
    }

    const handlePriceChange = (event, newValue) => {
        setSliderValues01(newValue)
    };

    const handlePriceChangeForQuery = (event, newValue) => {
        setQueryHelper({
            ...queryHelper,
            min_price: newValue[0],
            max_price: newValue[1]
        })
    };

    function priceText(value) {
        return `Rs${value}`;
    }

    const handleCapacityChange = (event, newValue) => {
        setSliderValues02(newValue)
    };

    const handleCapacityChangeForQuery = (event, newValue) => {
        setQueryHelper({
            ...queryHelper,
            min_cap: newValue[0],
            max_cap: newValue[1],
        })
    };

    function capacityText(value) {
        return `${value}`;
    }

    const onSubmitFilters = async (e) => {
        e.preventDefault();
        const searchString = qs.stringify(queryHelper);

        history.push({
            pathname: '/Search',
            search: searchString,
        })
    }

    return (


        <div className='container'>
            <div className='py-4'>



                <div className='row'>

                    <div className='col-md-3 px-3 mb-3'>
                        <div className='col'>

                            <div className='row'>
                                <label className='text-center mb-5 fw-bold'>PKR/Head</label>
                                <div>

                                    <Slider
                                        component={'span'} variant={'body2'}
                                        color={"primary"}
                                        min={0}
                                        step={25}
                                        max={10000}
                                        defaultValue={sliderValue01}
                                        getAriaLabel={() => 'Price Range'}
                                        value={sliderValue01}
                                        onChange={handlePriceChange}
                                        onChangeCommitted={handlePriceChangeForQuery}
                                        valueLabelDisplay="on"
                                        getAriaValueText={priceText}
                                    />

                                </div>
                            </div>

                            <hr className='mt-5 mb-5'></hr>

                            <div className='row mb-5'>
                                <label className='text-center mb-5 fw-bold'>Capacity</label>
                                <div>
                                    <Slider
                                        component={'span'} variant={'body2'}
                                        min={0}
                                        step={25}
                                        max={5000}
                                        defaultValue={sliderValue02}
                                        getAriaLabel={() => 'Capacity'}
                                        value={sliderValue02}
                                        onChange={handleCapacityChange}
                                        onChangeCommitted={handleCapacityChangeForQuery}
                                        valueLabelDisplay="on"
                                        getAriaValueText={capacityText}
                                    />
                                </div>
                            </div>

                            <form onSubmit={e => onSubmitFilters(e)}>
                                <div>
                                    <p className='text-center'>
                                        <button className="btn btn-primary" type="submit">
                                            <span style={{ fontWeight: "bold" }}>Apply Filters</span>
                                        </button>
                                    </p>

                                </div>
                            </form>

                        </div>
                    </div>

                    <div className='col-md-9'>
                        <span>
                            {!loading &&
                                <p className='text-center'>
                                    <span className="spinner-border text-primary" role="status">
                                        <span className="sr-only"></span>
                                    </span>
                                </p>
                            }
                        </span>
                        {loading &&

                            <div>

                                <div className="row d-flex justify-content-center mb-3">
                                    {venues.map((venue) => {
                                        return (
                                            <div key={venue.venue_id} className="col-12 v my-2">
                                                <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/venue/${venue.venue_id}`}>
                                                    <div className="card shadow-sm w-100">
                                                        <div className='row'>

                                                            <div className='col-md-5'>
                                                                <img src={venue.image_thumb} className="card-img-top mx-auto mx-md-0 d-block" alt="..." style={{ width: 300, height: 200 }} />
                                                            </div>

                                                            <div className='col-md-6'>

                                                                <div className="card-body mt-md-4">
                                                                    <h5 className="card-title text-left h3">{venue.name}</h5>
                                                                    <h6 className="card-subtitle mb-3 text-muted text-left">
                                                                        {venue.city}, {venue.area}
                                                                    </h6>
                                                                    <p className="card-subtitle text-muted text-left">{venue.price_per_head} PKR/Head</p>
                                                                    <p className="card-subtitle text-muted text-left">{venue.min_cap}-{venue.max_cap} people</p>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </Link>


                                            </div>
                                        );
                                    })}
                                </div>


                                {!(pageCount <= 1) &&
                                    <ReactPaginate
                                        previousLabel={"Previous"}
                                        next={"Next"}
                                        breakLabel={"..."}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={3}
                                        pageRangeDisplayed={3}
                                        onPageChange={handlePageClick}
                                        containerClassName={"pagination justify-content-center"}
                                        pageClassName={"page-item"}
                                        pageLinkClassName={"page-link"}
                                        previousClassName={"page-link"}
                                        nextClassName={"page-link"}
                                        breakClassName={"page-item"}
                                        breakLinkClassName={"page-link"}
                                        activeClassName={"active"}
                                        forcePage={pageHelper}
                                    />
                                }
                            </div>

                        }
                    </div>
                </div>

            </div>
        </div>


    )
}

export default SearchResults
