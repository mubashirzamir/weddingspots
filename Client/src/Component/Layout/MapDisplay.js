import React, { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ['places'];

function MapDisplay(props) {

    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const lat = Number(props.lat)
        const lng = Number(props.lng)
        setSelected({ lat: lat, lng: lng })
    }, [props.lat, props.lng])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        libraries,
    });


    if (!isLoaded) return <div>Loading...</div>;

    return <Map />;

    function Map() {


        const center = useMemo(() => ({ lat: selected.lat, lng: selected.lng }), []);

        return (
            <>
                <GoogleMap
                    zoom={16}
                    center={center}
                    mapContainerClassName="map-container"
                >
                    {<Marker position={(center)} />}
                </GoogleMap>

            </>
        );
    }

}

export default React.memo(MapDisplay);




