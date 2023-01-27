import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import styles from './Navigation.module.css';

const Navigation = (props) => {
    const ctx = useContext(AuthContext);

    return (
        <nav className={styles.nav}>
            <ul>
                <>
                    <li>
                        <Link to={'/map'}>
                            <button>Go to Map</button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/login'}>
                            <button onClick={ctx.onLogout}>Logout</button>
                        </Link>
                    </li>
                </>
            </ul>
        </nav>
    );
};

export default Navigation;
