import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
        minHeight: 560,
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
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
            width: 300,
        },
    }
}));

export default function OrderForm({ handleSubmit, orderID, setOrderID }) {
    const classes = useStyles();

    return (
        <div className='orderForm'>
            <form onSubmit={handleSubmit} className={classes.formGroup} noValidate autoComplete="off">
                <Typography className={classes.subtitle} variant="body1">
                    Enter order Details
                </Typography>
                <TextField
                    helperText="enter orderID"
                    value={orderID}
                    onChange={(e) => setOrderID(e.target.value)}
                    id="orderIDtxt"
                    label="Order ID"
                    size="small"
                    color="secondary"
                />
                <Button
                    size="small"
                    variant="outlined"
                    onClick={handleSubmit}
                    color="secondary">ENTER</Button>
            </form>
        </div>
    )
}