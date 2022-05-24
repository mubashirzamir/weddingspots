import React, { useState, useEffect } from 'react'
import Search from './Search'
import { Link, useLocation, useHistory } from 'react-router-dom'
import ReactPaginate from "react-paginate"
import axios from 'axios'
import Slider from '@mui/material/Slider';
import qs from 'query-string';

function SearchResults(query) {

    let history = useHistory();

    let size = 5;

    const [loading, setLoading] = useState(false);
    const [venues, setVenue] = useState([]);
    const [pageCount, setPageCount] = useState(0);

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
        await axios.get(`http://localhost:3001/api/venues${query.query}&page=${currentPage}&size=${size}`).then(response => {
            console.log(response.data)
            console.log("total", response.data.data.totalItems)
            const total = response.data.data.totalItems
            setPageCount(Math.ceil(total / size))
            setVenue(response.data.data.items)
            setLoading(true)
        }).catch(error => {
            console.log(error.response.data)
        });

    }

    const handlePageClick = async (data) => {
        console.log(data.selected)
        let currentPage = data.selected
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
        console.log(searchString)
        history.push({
            pathname: '/Search',
            search: searchString,
        })
    }

    return (


        <div className='container'>
            <div className='py-4'>



                <div className='row'>

                    <div className='col-md-3'>
                        <div className='col'>

                            <div className='row'>
                                <label className='text-center mb-5'>Price Per Head</label>
                                <div>
                                    <Slider
                                        min={0}
                                        step={25}
                                        max={10000}
                                        defaultValue={[sliderValue01]}
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
                                <label className='text-center mb-5'>Capacity</label>
                                <div>
                                    <Slider
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
                                <table className="table shadow mb-3">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">City</th>
                                            <th scope="col">Area</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Halls</th>
                                            <th scope="col">Price per head</th>
                                            <th scope="col">Capacity</th>

                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            venues.map((venue, index) => (

                                                <tr key={venue.venue_id}>
                                                    <th scope="row">{venue.venue_id}</th>
                                                    <td>
                                                        <div >
                                                            <img className="img-thumbnail" style={{ width: 100, height: 100 }}
                                                                src={venue.image_thumb}
                                                                alt={venue.venue_id}
                                                                width={200} height={200}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>{venue.name}</td>
                                                    <td>{venue.city}</td>
                                                    <td>{venue.area}</td>
                                                    <td>{venue.type}</td>
                                                    <td>{venue.halls}</td>
                                                    <td>{venue.price_per_head}</td>
                                                    <td>{venue.min_cap}-{venue.max_cap}</td>
                                                    <td>

                                                        <div className='btn-group'>
                                                            <Link className="btn btn-primary me-2" to={`/venue/${venue.venue_id}`}>View</Link>
                                                        </div>

                                                    </td>
                                                </tr>

                                            ))

                                        }


                                    </tbody>
                                </table>
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
