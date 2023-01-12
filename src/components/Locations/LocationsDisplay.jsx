import LocationItem from './LocationItem';
import styles from './LocationsDisplay.module.css';

const LocationsDisplay = (props) => {
    return (
        <div className={styles.locations}>
            {props.locations.map((place) => (
                <ul className={styles.ul} key={place.id}>
                    <LocationItem
                        dbId={place.dbId}
                        onRemoveLocation={props.onRemoveLocation}
                        name={place.name}
                        description={place.description}
                        imgUrl={place.imgUrl}
                    ></LocationItem>
                </ul>
            ))}
        </div>
    );
};

export default LocationsDisplay;
