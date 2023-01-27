import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    position: 'absolute',
    top: '5rem',
    width: '100%',
    height: '93%',
};

const center = {
    lat: 45.757435,
    lng: 21.230135,
};

const LocationsMap = (props) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBu2cSGoc9p4DOQV8FwNlC7rBjyaqf4Wls',
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {
                /* Child components, such as markers, info windows, etc. */
                // array.map pt fiecare locatie, si pt fiecare returnez un marker
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
            <></>
        </GoogleMap>
    ) : (
        <>
            <p>Couldn't load map.</p>
        </>
    );
};

export default React.memo(LocationsMap);
