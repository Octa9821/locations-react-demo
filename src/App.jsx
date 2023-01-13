import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Layout/Header';
import AddLocation from './components/Locations/AddLocation';
import LocationsDisplay from './components/Locations/LocationsDisplay';

function App() {
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchLocationsHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                'https://localhost:8370/api/Locations'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            const loadedLocations = [];

            for (const key in data) {
                loadedLocations.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    imgUrl: data[key].imgUrl,
                });
            }

            setLocations(loadedLocations);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    const addLocationHandler = useCallback(async (location) => {
        const response = await fetch('https://localhost:8370/api/Locations', {
            method: 'POST',
            body: JSON.stringify(location),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();

        try {
            const response = await fetch(
                'https://localhost:8370/api/Locations'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            const loadedLocations = [];

            for (const key in data) {
                loadedLocations.push({
                    id: key,
                    dbId: data[key].id,
                    name: data[key].name,
                    description: data[key].description,
                    imgUrl: data[key].imgUrl,
                });
            }

            setLocations(loadedLocations);
        } catch (error) {
            setError(error.message);
        }

        console.log(data);
    }, []);

    const removeLocationHandler = useCallback(async (locationId) => {
        console.log(locationId);
        fetch('https://localhost:8370/api/Locations/' + locationId, {
            method: 'DELETE',
        }).then(async () => {
            try {
                const response = await fetch(
                    'https://localhost:8370/api/Locations'
                );

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                const data = await response.json();

                const loadedLocations = [];

                for (const key in data) {
                    loadedLocations.push({
                        id: key,
                        dbId: data[key].id,
                        name: data[key].name,
                        description: data[key].description,
                        imgUrl: data[key].imgUrl,
                    });
                }

                setLocations(loadedLocations);
            } catch (error) {
                setError(error.message);
            }
        });
    }, []);

    useEffect(() => {
        fetchLocationsHandler();
    }, [fetchLocationsHandler, addLocationHandler, removeLocationHandler]);

    let content = <section>Found no locations.</section>;

    if (locations.length > 0) {
        content = (
            <LocationsDisplay
                locations={locations}
                onRemoveLocation={removeLocationHandler}
            ></LocationsDisplay>
        );
    }

    if (error) {
        content = <section>{error}</section>;
    }

    if (isLoading) {
        content = <section>Loading...</section>;
    }

    return (
        <>
            <Header></Header>
            <AddLocation onAddLocation={addLocationHandler}></AddLocation>
            {content}
        </>
    );
}

export default App;
