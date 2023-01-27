import styles from './LocationSideBarItem.module.css';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const LocationSideBarItem = (props) => {
    // add on click, pop-up with image
    return (
        <div className={styles.item_box}>
            <span className={styles.span}>
                <img
                    className={styles.img}
                    src={props.imgUrl}
                    alt={props.name}
                ></img>
                <div className={styles.text_and_buttons}>
                    <div className={styles.text_box}>
                        <p className={styles.p_name}>{props.name}</p>
                        <p className={styles.p_desc}>{props.description}</p>
                    </div>
                    <button className={styles.button}>
                        <TravelExploreIcon></TravelExploreIcon>
                    </button>
                </div>
            </span>
        </div>
    );
};

export default LocationSideBarItem;
