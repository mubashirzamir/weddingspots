import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom';

const Search = (props) => {

    let history = useHistory();

    const [query, setQuery] = useState({
        name: "",
        city: ""
    })

    const { name, city } = query;

    const onInputChange = e => {
        setQuery({ ...query, [e.target.name]: e.target.value })
        //console.log(e.target.value)
    };

    const onSubmit = async (e, currentPage) => {
        e.preventDefault();
        /*props.loadVenues(query.name, query.city)*/
        history.push({
            pathname: '/SearchResults',
            state: {
                name: query.name,
                city: query.city,

            }
        })
    }

    return (
        <div className="container">
            <div className="py-4">
                <form onSubmit={e => onSubmit(e)} >

                    <div className="row">

                        <div class="col-md-3 mb-3">
                            <label className="mb-1">City</label>
                            <input type="text" class="form-control" placeholder="" name="city" value={city} onChange={e => onInputChange(e)} autoComplete="new-password" />
                        </div>

                        <div class="col-md-9 mb-3">
                            <label className="mb-1">Venue Name</label>
                            <input type="text" class="form-control" placeholder="What are you looking for?" name="name" value={name} onChange={e => onInputChange(e)} autoComplete="new-password" />

                        </div>

                    </div>

                    <div>
                        <button class="btn btn-primary float-end" type="submit">Search</button>
                    </div>




                    {/*<div className='row'>
                        <div class="col-md-3 mb-3">
                            <label className="mb-1">City</label>
                            <input type="text" class="form-control" placeholder="" name="city" value={city} onChange={e => onInputChange(e)} autoComplete="new-password" />
                        </div>


                        <div class="col-md-3 mb-3">
                            <label className="mb-1">PKR/Head</label>
                            <input type="text" class="form-control" placeholder="" name="price_per_head" value={price_per_head} onChange={e => onInputChange(e)} autoComplete="new-password" />
                        </div>

                        <div class="col-md-3 mb-3">
                            <label className="mb-1">Minimum Capacity</label>
                            <input type="text" class="form-control" placeholder="" name="min_cap" value={min_cap} onChange={e => onInputChange(e)} autoComplete="new-password" />
                        </div>

                        <div class="col-md-3 mb-3">
                            <label className="mb-1">Maximum capacity</label>
                            <input type="text" class="form-control" placeholder="" name="max_cap" value={max_cap} onChange={e => onInputChange(e)} autoComplete="new-password" />
                        </div>
                    </div>

                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="What are you looking for?" name="name" value={name} aria-label="" aria-describedby="basic-addon1" onChange={e => onInputChange(e)} autoComplete="new-password" />
                        <div class="input-group-prepend">
                            <button class="btn btn-primary" type="submit">Search</button>
                        </div>
    </div>*/}
                </form>


            </div >
        </div >
    )
}

export default Search
