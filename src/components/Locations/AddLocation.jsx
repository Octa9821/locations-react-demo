import styles from './AddLocation.module.css';
import { useRef, useState } from 'react';

const AddLocation = (props) => {
    const nameRef = useRef('');
    const descriptionRef = useRef('');
    const imgUrlRef = useRef('');
    const latitudeRef = useRef('');
    const longitudeRef = useRef('');
    const [namePlaceholder, setNamePlaceholder] = useState('');
    const [descriptionPlaceholder, setDescriptionPlaceholder] = useState('');
    const [imgUrlPlaceholder, setImgUrlPlaceholder] = useState('');
    const [latitudePlaceholder, setLatitudePlaceholder] = useState('');
    const [longitudePlaceholder, setLongitudePlaceholder] = useState('');

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
        if (latitudeRef.current.value.length <= 4) {
            setLatitudePlaceholder('Please insert a valid latitude.');
            formIsValid = false;
        }
        if (longitudeRef.current.value.length <= 4) {
            setLongitudePlaceholder('Please insert a valid longitude.');
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
            latitude: latitudeRef.current.value,
            longitude: longitudeRef.current.value,
        };

        setNamePlaceholder('');
        setDescriptionPlaceholder('');
        setImgUrlPlaceholder('');
        setLatitudePlaceholder('');
        setLongitudePlaceholder('');

        nameRef.current.value = '';
        descriptionRef.current.value = '';
        imgUrlRef.current.value = '';
        latitudeRef.current.value = '';
        longitudeRef.current.value = '';

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
            <label htmlFor="latitude" className={styles.label}>
                Latitude
            </label>
            <input
                placeholder={latitudePlaceholder}
                type="number"
                step="0.000001"
                id="latitude"
                className={styles.input}
                ref={latitudeRef}
            ></input>
            <label htmlFor="longitude" className={styles.label}>
                Longitude
            </label>
            <input
                placeholder={longitudePlaceholder}
                type="number"
                step="0.000001"
                id="longitude"
                className={styles.input}
                ref={longitudeRef}
            ></input>
            <button className={styles.button} type="submit">
                Add Location
            </button>
        </form>
    );
};

export default AddLocation;
