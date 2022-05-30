import qs from 'query-string';
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./search.css";

const Search = () => {

    let history = useHistory();

    const [query, setQuery] = useState({
        city: "",
        name: "",
        type: "",
        area: "",
        min_cap: "",
        max_cap: "",
        min_price: "",
        max_price: ""
    })

    const { city, name, type, area } = query;

    const onInputChange = e => {
        setQuery({ ...query, [e.target.name]: e.target.value })
    };

    const searchString = qs.stringify(query);

    const onSubmit = async (e, currentPage) => {
        e.preventDefault();
        history.push({
            pathname: '/Search',
            search: searchString,
        })
    }

    return (
        <div className="container">
            <div className="py-4">
                <form onSubmit={e => onSubmit(e)} >


                    <div className="row">

                        <div className="col-md-3 mb-3">
                            <span className="caret"></span>
                            <select className="search form-select" placeholder="City" name="city" value={city} onChange={e => onInputChange(e)} required>
                                <option>City</option>
                                <option value="Karachi">Karachi</option>
                                <option value="Lahore">Lahore</option>
                                <option value="Islamabad">Islamabad</option>
                            </select>
                        </div>


                        <div className="col-md-3 mb-3">
                            <input type="text" className="search form-control" placeholder="Venue Name" name="name" value={name} onChange={e => onInputChange(e)} />
                        </div>

                        <div className="col-md-3 mb-3">
                            <span className="caret"></span>
                            <select className="search form-select" placeholder="Type" name="type" value={type} onChange={e => onInputChange(e)} required>
                                <option>Type</option>
                                <option value="Banquet">Banquet</option>
                                <option value="Lawn">Lawn</option>
                                <option value="Hotel">Hotel</option>
                                <option value="Farmhouse">Farmhouse</option>
                                <option value="Beach House">Beach House</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="col-md-3 mb-3">
                            <input type="text" className="search form-control" placeholder="Area" name="area" value={area} onChange={e => onInputChange(e)} />
                        </div>


                    </div>

                    <div>
                        <button className="btn btn-primary float-end" type="submit">
                            <span style={{ fontWeight: "bold" }}>Search</span>
                        </button>
                    </div>

                </form>
            </div >
        </div >
    )
}

export default Search
