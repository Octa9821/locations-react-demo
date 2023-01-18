import React, { useContext } from 'react';

import AuthContext from '../../store/auth-context';
import styles from './Navigation.module.css';

const Navigation = (props) => {
    const ctx = useContext(AuthContext);

    return (
        <nav className={styles.nav}>
            <ul>
                {ctx.isLoggedIn && (
                    <li>
                        <button onClick={ctx.onLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
