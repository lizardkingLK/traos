import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import arrays from '../../app_meta/arrays';
import MyRadioGroup from './ui/MyRadioGroup';

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
    card: {
        minWidth: 300,
        minHeight: 450,
        margin: 5
    },
    cardActions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 5
    },
    cardField: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '10px',
    }
}));

export default function AddOrder({
    orderID, colour, setColour, style, setStyle, size, setSize, handleClose, handleAdd, addSnackOpen, handleSnackAddClose, addSuccess
}) {
    const classes = useStyles();

    return (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <div className={classes.classField}>
                    <Typography className={classes.title} gutterBottom>
                        Add New Order
                    </Typography>
                </div>
                <div className={classes.classField}>
                    <Typography variant="body1" component="h2">
                        OrderID
                    </Typography>
                    <Typography className={classes.headTitle} variant="body1" component="h2">
                        {orderID}
                    </Typography>
                </div>
                <div className='radio'>
                    <FormControl component="fieldset">
                        <Typography variant="body1" component="h2">
                            Colour
                        </Typography>
                        <MyRadioGroup value={colour} setValue={setColour} array={arrays.COLOUR} />
                    </FormControl>
                </div>
                <div className='radio'>
                    <FormControl component="fieldset">
                        <Typography variant="body1" component="h2">
                            Style
                        </Typography>
                        <MyRadioGroup value={style} setValue={setStyle} array={arrays.STYLE} />
                    </FormControl>
                </div>
                <div className='radio'>
                    <FormControl component="fieldset">
                        <Typography variant="body1" component="h2">
                            Size
                        </Typography>
                        <MyRadioGroup value={size} setValue={setSize} array={arrays.SIZE} />
                    </FormControl>
                </div>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button
                    size="small"
                    onClick={handleClose}
                    variant="outlined">CLOSE</Button>
                <Button
                    size="small"
                    onClick={handleAdd}
                    variant="outlined">ADD</Button>
                <Snackbar open={addSnackOpen} autoHideDuration={6000} onClose={handleSnackAddClose}>
                    <Alert onClose={handleSnackAddClose} severity={addSuccess.severity}>
                        {addSuccess.message}
                    </Alert>
                </Snackbar>
            </CardActions>
        </Card>
    )
}