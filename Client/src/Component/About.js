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
            url: `https://weddingspots.herokuapp.com/api/about`,
        })
            .then((response => {

                setInfo(response.data.data)
                setLoading(true)
            }))
            .catch((error) => {
                setLoading(true)
                if (typeof error.response === 'undefined') {

                    alert("Server Down")
                }
                else {
                    alert(error.response.data.error.message)
                }
            })
    }

    return (
        <div className="container">

            <div className="py-4">

                <h1></h1>

                {!loading &&
                    <div className="spinner-border text-primary" role="status">
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
