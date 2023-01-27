import { Pagination } from '@mui/material';
import styles from './LocationsSideBar.module.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useEffect } from 'react';
import LocationSideBarItem from './LocationSideBarItem';

const LocationsSideBar = () => {
    let authToken = localStorage.getItem('authToken');
    const queryClient = useQueryClient();
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const defaultPageNumber = 1;
    const [totalPages, setTotalPages] = useState(1);

    const getLocationsPage = async () => {
        const response = await fetch(
            'https://localhost:44335/api/Locations/pagination/' +
                currentPageNumber,
            {
                headers: {
                    Authorization: 'Bearer ' + authToken,
                },
            }
        );
        const locationsPage = await response.json();
        setTotalPages(locationsPage.totalPages);

        let loadedLocations = [];

        for (const key in locationsPage.locations) {
            loadedLocations.push({
                id: key,
                name: locationsPage.locations[key].name,
                description: locationsPage.locations[key].description,
                imgUrl: locationsPage.locations[key].imgUrl,
                latitude: locationsPage.locations[key].latitude,
                longitude: locationsPage.locations[key].longitude,
            });
        }
        return loadedLocations;
    };

    // Fetch with React Query
    const { data: locationsOnPage, refetch } = useQuery({
        queryKey: ['locations', currentPageNumber],
        queryFn: getLocationsPage,
    });

    useEffect(() => {
        if (currentPageNumber) {
            refetch().catch((e) => console.log(e));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPageNumber]);

    const handlePageChange = (event, value) => {
        setCurrentPageNumber(value);
    };

    return (
        <div className={styles.div}>
            <div className={styles.items_box}>
                {locationsOnPage.map((location) => {
                    return (
                        <LocationSideBarItem
                            key={location.id}
                            name={location.name}
                            imgUrl={location.imgUrl}
                            description={location.description}
                            latitude={location.latitude}
                            longitude={location.longitude}
                        />
                    );
                })}
            </div>
            <Pagination
                defaultPage={defaultPageNumber}
                count={totalPages}
                onChange={handlePageChange}
            ></Pagination>
        </div>
    );
};

export default LocationsSideBar;
