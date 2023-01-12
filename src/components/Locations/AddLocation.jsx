import styles from './AddLocation.module.css';
import { useRef, useState } from 'react';

const AddLocation = (props) => {
    const nameRef = useRef('');
    const descriptionRef = useRef('');
    const imgUrlRef = useRef('');
    const [namePlaceholder, setNamePlaceholder] = useState('');
    const [descriptionPlaceholder, setDescriptionPlaceholder] = useState('');
    const [imgUrlPlaceholder, setImgUrlPlaceholder] = useState('');

    function formValidation(event) {
        let formIsValid = true;
        // validation
        if (nameRef.current.value.length <= 0) {
            setNamePlaceholder('Please insert a name.');
            formIsValid = false;
        }
        if (descriptionRef.current.value.length <= 0) {
            setDescriptionPlaceholder('Please insert a description.');
            formIsValid = false;
        }
        if (imgUrlRef.current.value.length <= 0) {
            setImgUrlPlaceholder('Please insert an image url.');
            formIsValid = false;
        }
        return formIsValid;
    }

    function submitHandler(event) {
        event.preventDefault();

        if (!formValidation(event)) {
            return;
        }

        const location = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            imgUrl: imgUrlRef.current.value,
        };

        setNamePlaceholder('');
        setDescriptionPlaceholder('');
        setImgUrlPlaceholder('');

        nameRef.current.value = '';
        descriptionRef.current.value = '';
        imgUrlRef.current.value = '';

        props.onAddLocation(location);
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <label htmlFor="name" className={styles.label}>
                Name
            </label>
            <input
                placeholder={namePlaceholder}
                type="text"
                id="name"
                className={styles.input}
                ref={nameRef}
            ></input>
            <label htmlFor="description" className={styles.label}>
                Description
            </label>
            <input
                placeholder={descriptionPlaceholder}
                type="text"
                id="description"
                className={styles.input}
                ref={descriptionRef}
            ></input>
            <label htmlFor="image-url" className={styles.label}>
                Image URL
            </label>
            <input
                placeholder={imgUrlPlaceholder}
                type="url"
                id="image-url"
                className={styles.input}
                ref={imgUrlRef}
            ></input>
            <button className={styles.button} type="submit">
                Add Location
            </button>
        </form>
    );
};

export default AddLocation;
