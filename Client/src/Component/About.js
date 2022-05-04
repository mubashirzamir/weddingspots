import axios from 'axios';
import React, { useState, useEffect } from 'react'

function About() {

    const [loading, setLoading] = useState(false);

    const [info, setInfo] = useState();

    useEffect(() => {
        loadInfo()
    }, [])

    const loadInfo = async () => {
        await axios({
            method: 'get',
            url: "http://localhost:3001/api/about",
        })
            .then((response => {
                console.log(response.data)
                setInfo(response.data.data)
                setLoading(true)
            }))
            .catch((error) => {
                setLoading(true)
                //alert(error.response.data.error.message)
                console.log(error.response.data)
            })
    }

    return (
        <div className="container">

            <div className="py-4">

                <h1></h1>

                {!loading &&
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>

                }

                <div>

                    {info}

                </div>


            </div>


        </div>
    )
}

export default About
