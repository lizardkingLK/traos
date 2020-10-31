import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Skeleton from '@material-ui/lab/Skeleton';

import TimeLine from './TimeLine';

import axios from 'axios';

const useStyles = makeStyles({
    modal: {
        backgroundColor: 'gray',
        minWidth: 300,
        minHeight: 450,
    },
    titleBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 15,
    },
    bodyBar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
    }
});

export default function History({ open, setOpen, url, setSelected }) {
    const classes = useStyles();
    const [clicked, setClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState(null);

    const handleHistory = async () => {
        setClicked(true);
        setLoading(true);
        await axios.get(url.call + url.para)
            .then(res => {
                setHistory(res.data);
            })
        setLoading(false);
    }

    const handleClose = () => {
        setSelected('');
        setHistory(null);
        setClicked(false);
        setOpen(false);
    }

    return (
        <Dialog fullScreen className={classes.modal} onClose={handleClose} aria-labelledby="order-history-dialog" open={open}>
            <div className={classes.titleBar}>
                <Typography variant="button" compnent="h2">
                    Order History
                </Typography>
                <IconButton aria-label="close" color="primary" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <Divider />
            <div className={classes.bodyBar}>
                <Typography variant="button" compnent="h2">
                    {url.para}
                </Typography>
                <IconButton aria-label="show" color="primary" onClick={handleHistory}>
                    <KeyboardArrowDownIcon />
                </IconButton>

                {loading && clicked ? (
                    <Skeleton variant="rect" width={'90vw'} height={420} />
                ) : history ? (
                    <TimeLine history={history} />
                ) : (
                            <></>
                        )}
            </div>
        </Dialog>
    );
}
