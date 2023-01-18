import styles from './Header.module.css';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Navigation from './Navigation';

const Header = (props) => {
    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.h1}>
                    <LocationCityIcon
                        fontSize="large"
                        className={styles.icon}
                    />
                    React Locations App
                </h1>
                <Navigation onLogout={props.onLogout} />
            </div>
        </div>
    );
};

export default Header;
