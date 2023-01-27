import styles from './Header.module.css';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className={styles.header}>
                <span
                    onClick={() => {
                        navigate('/home');
                    }}
                    className={styles.span}
                >
                    <h1 className={styles.h1}>
                        <LocationCityIcon
                            fontSize="large"
                            className={styles.icon}
                        />
                        React Locations App
                    </h1>
                </span>

                <Navigation onLogout={props.onLogout} />
            </div>
        </div>
    );
};

export default Header;
