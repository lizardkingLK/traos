import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

import History from '../orders/History';

import functions from '../../app_meta/functions';

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
    },
    field1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '40px 0 40px 0',
    },
    field2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '20px 0 20px 0',
    },
}));

export default function OrderDetails({ order }) {
    const classes = useStyles();
    const [selected, setSelected] = useState('');
    const [historyURL, setHistoryURL] = useState('');
    const [open, setOpen] = useState(false);

    const showOrder = (e) => {
        setSelected(order.orderID);
        setHistoryURL({ call: '/api/histories/getHistory/', para: order.orderID });
        setOpen(true);
    }

    return (
        <Card className='card' variant="outlined">
            <CardContent>
                <div className={classes.field2}>
                    <Typography className={classes.title} gutterBottom>
                        Order Details
                    </Typography>
                </div>
                <div className={classes.field2}>
                    <Typography variant="body1" component="h2">
                        OrderID
                    </Typography>
                    <Typography className={classes.headTitle} variant="body2" component="h2">
                        {order.orderID}
                    </Typography>
                </div>
                <div className={classes.field2}>
                    <Typography variant="body1" component="h2">
                        Created Date
                    </Typography>
                    <Typography className={classes.headTitle} variant="body2" component="h2">
                        {functions.FORMAT_DATE_B(order.createdDate)}
                    </Typography>
                </div>
                <div className={classes.field2}>
                    <Typography variant="body1" component="h2">
                        Colour
                    </Typography>
                    <Typography className={classes.headTitle} variant="body2" component="h2">
                        {order.colour}
                    </Typography>
                </div>
                <div className={classes.field2}>
                    <Typography variant="body1" component="h2">
                        Style
                    </Typography>
                    <Typography className={classes.headTitle} variant="body2" component="h2">
                        {order.style}
                    </Typography>
                </div>
                <div className={classes.field2}>
                    <Typography variant="body1" component="h2">
                        Size
                    </Typography>
                    <Typography className={classes.headTitle} variant="body2" component="h2">
                        {order.size}
                    </Typography>
                </div>
                <div className={classes.field2}>
                    <Typography variant="body1" component="h2">
                        Currently In
                    </Typography>
                    <Typography className={classes.headTitle} variant="body2" component="h2">
                        {order.stationedIn}
                    </Typography>
                </div>
                <div className={classes.field2}>
                    <Typography variant="body1" component="h2">
                        Status
                    </Typography>
                    <Typography className={classes.headTitle} variant="body2" component="h2">
                        {order.stationedStatus}
                    </Typography>
                </div>
                <div className={classes.field2}>
                    <Typography variant="body1" component="h2">
                        Completion
                    </Typography>
                    <Typography className={classes.headTitle} variant="body2" component="h2">
                        {order.orderStatus}
                    </Typography>
                </div>
                <div className={classes.field2}>
                    <Typography variant="body1" component="h2">
                        History
                    </Typography>
                </div>
                <div className={classes.field1}>
                    <Button onClick={showOrder}>View</Button>
                    <History open={open} setOpen={setOpen} url={historyURL} setSelected={setSelected} selected={selected} />
                </div>
            </CardContent>
        </Card>
    )
}