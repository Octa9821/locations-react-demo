import axios from 'axios';
import { useRef, useState } from 'react';
import styles from './AuthenticationScreen.module.css';

const AuthenticationScreen = () => {
    const usernameRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [isRegister, setIsRegister] = useState('');

    const formValidation = (event) => {
        let formIsValid = true;
        setUsernameError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);
        // validation
        if (usernameRef.current.value.length <= 0) {
            setUsernameError(true);
            formIsValid = false;
        }
        if (passwordRef.current.value.length <= 0) {
            setPasswordError(true);
            formIsValid = false;
        }
        if (confirmPasswordRef.current.value !== passwordRef.current.value) {
            setConfirmPasswordError(true);
            formIsValid = false;
        }
        return formIsValid;
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        let url = 'http://localhost:8370/api/Authentication/';
        // use .fetch() instead of axios to see if it works

        if (!formValidation(event)) {
            return;
        }

        if (isRegister) {
            url += 'register';
        } else {
            url += 'login';
        }
        var result = await axios.post(url, {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        });
        debugger;
    };

    return (
        <div>
            <h3>Authentication</h3>
            <form onSubmit={submitHandler}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" ref={usernameRef}></input>
                {usernameError && (
                    <label className={styles.label_error}>
                        Please insert a username.
                    </label>
                )}
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    minLength="8"
                    ref={passwordRef}
                ></input>
                {passwordError && (
                    <label className={styles.label_error}>
                        Please insert a password.
                    </label>
                )}
                {isRegister && (
                    <>
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            minLength="8"
                            ref={confirmPasswordRef}
                        ></input>
                        {confirmPasswordError && (
                            <label className={styles.label_error}>
                                The passwords do not match.
                            </label>
                        )}
                        <span>
                            <p>Already a user?</p>
                            <p
                                className={styles.p_authenticationText}
                                onClick={() => setIsRegister(false)}
                            >
                                LOGIN
                            </p>
                        </span>
                    </>
                )}
                {!isRegister && (
                    <>
                        <span>
                            <p>Need an account?</p>
                            <p
                                className={styles.p_authenticationText}
                                onClick={() => setIsRegister(true)}
                            >
                                REGISTER
                            </p>
                        </span>
                    </>
                )}
                <span>
                    <button type="submit">
                        {isRegister ? 'Register' : 'Login'}
                    </button>
                </span>
            </form>
        </div>
    );
};

export default AuthenticationScreen;
