import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import LocationsSideBar from './LocationsSideBar';

const containerStyle = {
    position: 'absolute',
    top: '5rem',
    width: '100%',
    height: '93%',
};

let center = {
    lat: 0,
    lng: 0,
};

const LocationsMap = (props) => {
    const [currentCenter, setCurrentCenter] = useState(center);
    const [zoom, setZoom] = useState(3);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBu2cSGoc9p4DOQV8FwNlC7rBjyaqf4Wls',
    });

    const handleFindOnMap = (latitude, longitude) => {
        center = {
            lat: latitude,
            lng: longitude,
        };
        setZoom(8);

        return setCurrentCenter(center);
    };

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        map.setZoom(zoom);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentCenter}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {
                /* Child components, such as markers, info windows, etc. */
                props.locations.map((location) => {
                    return (
                        <Marker
                            key={location.id}
                            position={{
                                lat: location.latitude,
                                lng: location.longitude,
                            }}
                        />
                    );
                })
            }
            <LocationsSideBar
                locations={props.locations}
                onFindOnMap={handleFindOnMap}
            />
            <></>
        </GoogleMap>
    ) : (
        <>
            <p>Couldn't load map.</p>
        </>
    );
};

export default React.memo(LocationsMap);
