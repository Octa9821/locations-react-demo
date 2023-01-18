// import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import AuthContext from '../../store/auth-context';
import styles from './AuthenticationScreen.module.css';

const AuthenticationScreen = () => {
    const authCtx = useContext(AuthContext);
    const usernameRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [isRegister, setIsRegister] = useState('');
    const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
    const [isRegisterComplete, setIsRegisterComplete] = useState(false);

    const formValidation = () => {
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
        if (isRegister) {
            if (
                confirmPasswordRef.current.value !== passwordRef.current.value
            ) {
                setConfirmPasswordError(true);
                formIsValid = false;
            }
        }

        return formIsValid;
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        let url = 'https://localhost:44335/api/Authentication/';

        if (!formValidation(event)) {
            return;
        }

        if (isRegister) {
            url += 'register';
        } else {
            url += 'login';
        }
        let authData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(authData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            let data = await response.status;
            console.log('Result ok, response: ' + data);

            if (url.includes('login')) {
                setIsInvalidCredentials(false);
                authCtx.onLogin(authData.username, authData.password);
            }

            if (url.includes('register')) {
                setIsRegisterComplete(true);
            }
        } else {
            console.log('Error:', response.status);
            if (response.status === 404 && url.includes('login')) {
                setIsInvalidCredentials(true);
            }
        }
    };

    return (
        <div>
            <h3 className={styles.h3}>Authentication</h3>
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
                    minLength={isRegister ? '8' : undefined}
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
                                onClick={() => {
                                    setIsRegister(false);
                                    setIsRegisterComplete(false);
                                }}
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
                                onClick={() => {
                                    setIsRegister(true);
                                    setIsInvalidCredentials(false);
                                }}
                            >
                                REGISTER
                            </p>
                        </span>
                    </>
                )}
                {isInvalidCredentials && (
                    <p className={styles.p_infoText}>
                        Invalid credentials. If you don't have an account,
                        please register.
                    </p>
                )}
                {isRegisterComplete && (
                    <p className={styles.p_infoText}>
                        Registration is complete. You can now login with your
                        new credentials.
                    </p>
                )}
                <button type="submit">
                    {isRegister ? 'Register' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default AuthenticationScreen;
