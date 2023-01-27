import { useCallback, useContext, useEffect, useState } from 'react';
import AuthenticationScreen from './components/Authentication/AuthenticationScreen';
import Header from './components/Layout/Header';
import AddLocation from './components/Locations/AddLocation';
import LocationsDisplay from './components/Locations/LocationsDisplay';
import AuthContext from './store/auth-context';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { initializeApp } from '@firebase/app';
import LocationsMap from './components/Map/LocationsMap';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import styles from './App.module.css';
import LocationsSideBar from './components/Map/LocationsSideBar';
import { ThemeProvider } from '@mui/material';
import theme from './store/theme/theme';

// App Firebase Config
const firebaseConfig = {
    apiKey: 'AIzaSyCS9bGcMM6YtQah7is0MZe8_NhVpTmoaAQ',
    authDomain: 'react-locations-app.firebaseapp.com',
    projectId: 'react-locations-app',
    storageBucket: 'react-locations-app.appspot.com',
    messagingSenderId: '345890419775',
    appId: '1:345890419775:web:62203ea56c0549c55a348a',
};

// Initialize Firebase
initializeApp(firebaseConfig);

function App() {
    const authCtx = useContext(AuthContext);
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    let authToken = localStorage.getItem('authToken');
    const navigate = useNavigate();
    const test = true;

    const fetchLocationsHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                'https://localhost:44335/api/Locations',
                {
                    headers: {
                        Authorization: 'Bearer ' + authToken,
                    },
                }
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
                    latitude: data[key].latitude,
                    longitude: data[key].longitude,
                });
            }

            setLocations(loadedLocations);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addLocationHandler = useCallback(async (location) => {
        const response = await fetch('https://localhost:44335/api/Locations', {
            method: 'POST',
            body: JSON.stringify(location),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + authToken,
            },
        });
        const data = await response.json();

        try {
            const response = await fetch(
                'https://localhost:44335/api/Locations',
                {
                    headers: {
                        Authorization: 'Bearer ' + authToken,
                    },
                }
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
                    latitude: data[key].latitude,
                    longitude: data[key].longitude,
                });
            }

            setLocations(loadedLocations);
        } catch (error) {
            setError(error.message);
        }

        console.log(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const removeLocationHandler = useCallback(async (locationId) => {
        console.log(locationId);
        fetch('https://localhost:44335/api/Locations/' + locationId, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + authToken,
            },
        }).then(async () => {
            try {
                const response = await fetch(
                    'https://localhost:44335/api/Locations',
                    {
                        headers: {
                            Authorization: 'Bearer ' + authToken,
                        },
                    }
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
                        latitude: data[key].latitude,
                        longitude: data[key].longitude,
                    });
                }

                setLocations(loadedLocations);
            } catch (error) {
                setError(error.message);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchLocationsHandler();
    }, [fetchLocationsHandler, addLocationHandler, removeLocationHandler]);

    useEffect(() => {
        if (test) {
            navigate('/test');
        } else {
            if (!authCtx.isLoggedIn) {
                navigate('/login');
            } else {
                navigate('/home');
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authCtx.isLoggedIn, test]);

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
        <ThemeProvider theme={theme}>
            <>
                <Routes>
                    <Route path="/login" element={<AuthenticationScreen />} />
                    <Route
                        path="/home"
                        element={
                            <>
                                <Header />
                                <AddLocation
                                    onAddLocation={addLocationHandler}
                                ></AddLocation>
                                {content}
                            </>
                        }
                    />
                    <Route
                        path="/map"
                        element={
                            <>
                                <Header />
                                {/* <button className={styles.sidebarButton}>
                                    <MenuRoundedIcon
                                        className={styles.menuIcon}
                                    ></MenuRoundedIcon>
                                </button> */}
                                <LocationsSideBar
                                    locations={locations}
                                ></LocationsSideBar>
                                <LocationsMap locations={locations} />
                            </>
                        }
                    />
                    <Route
                        path="/test"
                        element={
                            <>
                                <Header />
                                <LocationsSideBar></LocationsSideBar>
                            </>
                        }
                    />
                </Routes>
            </>
        </ThemeProvider>
    );
}

export default App;
