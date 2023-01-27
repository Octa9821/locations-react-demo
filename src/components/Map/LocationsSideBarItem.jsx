import styles from './LocationsSideBarItem.module.css';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { useState } from 'react';

const LocationSideBarItem = (props) => {
    // add on click, pop-up with image
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        props.onFindOnMap(props.latitude, props.longitude);
    };

    return (
        <div className={styles.item_box}>
            <span className={styles.span}>
                <img
                    className={styles.img}
                    src={props.imgUrl}
                    alt={props.name}
                    onClick={handleClickOpen}
                ></img>
                <div className={styles.text_and_buttons}>
                    <div className={styles.text_box}>
                        <p className={styles.p_name}>{props.name}</p>
                        <p className={styles.p_desc}>{props.description}</p>
                    </div>
                    <button className={styles.button} onClick={handleClick}>
                        <TravelExploreIcon></TravelExploreIcon>
                    </button>
                </div>
            </span>
            <Dialog onClose={handleClose} open={open} maxWidth="xl">
                <DialogTitle>{props.name}</DialogTitle>
                <DialogContent>
                    <img
                        className={styles.dialog_img}
                        src={props.imgUrl}
                        alt={props.name}
                    ></img>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LocationSideBarItem;
