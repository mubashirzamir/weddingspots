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
                if (error.response.data.error.message) {
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
