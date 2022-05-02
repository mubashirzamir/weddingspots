import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function Places() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        libraries: ["places"],
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

const handleSubmit = async (selected) => {
    console.log(selected)
}

const placeMarker = (e) => {
    console.log(e)
}

function Map() {
    const center = useMemo(() => ({ lat: 24.941985222562053, lng: 67.11435194116635 }), []);
    const [selected, setSelected] = useState(null);
    const [recenter, setRecenter] = useState(null);

    return (
        <>
            <div className="places-container">
                <PlacesAutocomplete setSelected={setSelected} setRecenter={setRecenter} />
            </div>

            <GoogleMap
                zoom={16}
                center={recenter ? recenter : center}
                mapContainerClassName="map-container"
                onClick={(e) => setSelected({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
            >
                {selected && <Marker position={selected} />}
            </GoogleMap>

            <div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit" onClick={() => handleSubmit(selected)}>Submit</button>
                </div>
            </div>

        </>
    );
}

const PlacesAutocomplete = ({ setSelected, setRecenter }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
        setRecenter({ lat, lng });
    };

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                className="form-control combobox-input"
                placeholder="Search an address"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};