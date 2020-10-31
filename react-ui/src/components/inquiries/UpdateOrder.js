import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

import arrays from '../../app_meta/arrays';
import functions from '../../app_meta/functions';
import { FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
        color: 'gray'
    },
    subtitle: {
        color: '#333333'
    },
    headTitle: {
        color: '#f50057'
    },
    cardActions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 5
    },
}));

export default function UpdateOrder({
    order, updateColour, setUpdateColour, updateStyle, setUpdateStyle, updateSize, setUpdateSize, updateStation, setUpdateStation,
    updateStationedStatus, setUpdateStationedStatus, updateOrderStatus, setUpdateOrderStatus, handleClose,
    handleUpdate, updateSnackOpen, handleSnackUpdateClose, updateSuccess
}) {
    const classes = useStyles();
    const [can, setCan] = useState(true);

    useEffect(function () {
        const oneTime = () => {
            if (can) {
                setUpdateColour(order.colour);
                setUpdateStyle(order.style);
                setUpdateSize(order.size);
                setUpdateStation(order.stationedIn);
                setUpdateStationedStatus(order.stationedStatus);
                setUpdateOrderStatus(order.orderStatus)
            }

            setCan(false);
        }

        oneTime();
    })

    const stationChanged = (e) => {
        setUpdateStation(e.target.value);

        if (e.target.value !== order.stationedIn)
            setUpdateStationedStatus('Pending');
    }

    return (
        <Card className='card' variant="outlined">
            <CardContent>
                <div className='field'>
                    <Typography className={classes.title} gutterBottom>
                        Update Order
                    </Typography>
                </div>
                <div className='field'>
                    <Typography variant="body1" component="h2">
                        OrderID
                    </Typography>
                    <Typography className={classes.headTitle} variant="body2" component="h2">
                        {order.orderID}
                    </Typography>
                </div>
                <div className='field'>
                    <Typography className={classes.subtitle} variant="body2" component="h2">
                        Colour
                    </Typography>
                    <FormHelperText>Please be cautious</FormHelperText>
                </div>
                <div className='field'>
                    <Select
                        labelId="update-colour-select-label"
                        id="update-colour-select"
                        value={updateColour}
                        color="secondary"
                        style={{ width: 250 }}
                        onChange={(e) => setUpdateColour(e.target.value)}
                    >
                        {arrays.COLOUR.map(c => (
                            <MenuItem key={c} value={c}>{c}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div className='field'>
                    <Typography className={classes.subtitle} variant="body2" component="h2">
                        Style
                    </Typography>
                    <FormHelperText>Please be cautious</FormHelperText>
                </div>
                <div className='field'>
                    <Select
                        labelId="update-style-select-label"
                        id="update-style-select"
                        value={updateStyle}
                        color="secondary"
                        style={{ width: 250 }}
                        onChange={(e) => setUpdateStyle(e.target.value)}
                    >
                        {arrays.STYLE.map(s => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div className='field'>
                    <Typography className={classes.subtitle} variant="body2" component="h2">
                        Size
                    </Typography>
                    <FormHelperText>Please be cautious</FormHelperText>
                </div>
                <div className='field'>
                    <Select
                        labelId="update-size-select-label"
                        id="update-size-select"
                        value={updateSize}
                        color="secondary"
                        style={{ width: 250 }}
                        onChange={(e) => setUpdateSize(e.target.value)}
                    >
                        {arrays.SIZE.map(s => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div className='field'>
                    <Typography className={classes.subtitle} variant="body2" component="h2">
                        Station
                    </Typography>
                    <FormHelperText>
                        {(order.stationedStatus !== 'Done') ? (
                            'Make sure previous station is \'Done\''
                        ) : (
                                'Please select next station'
                            )}
                    </FormHelperText>
                </div>
                <div className='field'>
                    <FormControl disabled={order.stationedStatus !== 'Done'}>
                        <Select
                            labelId="update-station-select-label"
                            id="update-station-select"
                            value={updateStation}
                            color="secondary"
                            style={{ width: 250 }}
                            onChange={stationChanged}
                        >
                            <MenuItem value={order.stationedIn}>
                                {order.stationedIn}
                            </MenuItem>
                            <MenuItem value={functions.NEXT_STATION(arrays.STATION, order.stationedIn)}>
                                {functions.NEXT_STATION(arrays.STATION, order.stationedIn)}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='field'>
                    <Typography className={classes.subtitle} variant="body2" component="h2">
                        Status
                    </Typography>
                    <FormHelperText>Will change if station changed</FormHelperText>
                </div>
                <div className='field'>
                    <Select
                        labelId="update-stationed-status-select-label"
                        id="update-stationed-status-select"
                        value={updateStationedStatus}
                        color="secondary"
                        style={{ width: 250 }}
                        onChange={(e) => setUpdateStationedStatus(e.target.value)}
                    >
                        {arrays.STATUS.map(s => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div className='field'>
                    <Typography className={classes.subtitle} variant="body2" component="h2">
                        Completion
                    </Typography>
                </div>
                <div className='field'>
                    <Select
                        labelId="update-order-status-select-label"
                        id="update-order-status-select"
                        value={updateOrderStatus}
                        color="secondary"
                        style={{ width: 250 }}
                        onChange={(e) => setUpdateOrderStatus(e.target.value)}
                    >
                        {arrays.STATUS.map(s => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                    </Select>
                </div>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button
                    size="small"
                    onClick={handleClose}
                    variant="outlined">CLOSE</Button>
                <Button
                    size="small"
                    onClick={handleUpdate}
                    variant="outlined">UPDATE</Button>
                <Snackbar open={updateSnackOpen} autoHideDuration={6000} onClose={handleSnackUpdateClose}>
                    <Alert onClose={handleSnackUpdateClose} severity={updateSuccess.severity}>
                        {updateSuccess.message}
                    </Alert>
                </Snackbar>
            </CardActions>
        </Card>
    )
}