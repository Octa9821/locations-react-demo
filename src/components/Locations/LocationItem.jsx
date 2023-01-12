import Card from '../UI/Card';
import styles from './LocationItem.module.css';

const LocationItem = (props) => {
    function onClickHandler(event) {
        event.preventDefault();

        props.onRemoveLocation(props.dbId);
    }

    return (
        <Card>
            <div className={styles.inline}>
                <h3 className={styles.h3}>{props.name}</h3>
                <p className={styles.p}>{props.description}</p>
            </div>
            <img
                className={styles.img}
                src={props.imgUrl}
                alt={props.name}
            ></img>
            <button className={styles.button} onClick={onClickHandler}>
                Remove item
            </button>
        </Card>
    );
};

export default LocationItem;
