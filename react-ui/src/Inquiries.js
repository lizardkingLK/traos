import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';

import OrderForm from './components/inquiries/OrderForm';
import Record from './components/inquiries/Record';
import AddOrder from './components/inquiries/AddOrder';

import './App.css';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    title: {
        color: 'gray'
    },
}));

export default function Inquiries(props) {
    const classes = useStyles();
    const id = props.match.params.id;
    const [orderForm, setOrderForm] = useState(false);
    const [orderID, setOrderID] = useState(id ? id : '');
    const [order, setOrder] = useState(null);
    const [colour, setColour] = useState('Red');
    const [style, setStyle] = useState('A');
    const [size, setSize] = useState('S');

    const [updateColour, setUpdateColour] = useState('Red');
    const [updateStyle, setUpdateStyle] = useState('A');
    const [updateSize, setUpdateSize] = useState('S');
    const [updateStation, setUpdateStation] = useState('Station A');
    const [updateStationedStatus, setUpdateStationedStatus] = useState('Pending');
    const [updateOrderStatus, setUpdateOrderStatus] = useState('Pending');

    const [addSnackOpen, setAddSnackOpen] = useState(false);
    const [updateSnackOpen, setUpdateSnackOpen] = useState(false);
    const [addSuccess, setAddSuccess] = useState({ severity: 'success', message: 'Order Added Successfully!' });
    const [updateSuccess, setUpdateSuccess] = useState({ severity: 'success', message: 'Order Updated Successfully!' });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (orderID)
            checkOrder();
    }

    const handleClose = () => {
        setOrderForm(false);
    }

    const handleAdd = (event) => {
        addOrder(function () {
            addHistory(function () {
                setAddSnackOpen(true);
            })
        })
    }

    const handleUpdate = (event) => {
        updateOrder(function () {
            updateHistory(function () {
                setUpdateSnackOpen(true);
            })
        })
    }

    const addHistory = async (callback) => {
        await axios.post('/api/histories/', {
            orderID, context: 'Create', description: {
                Colour: colour, Style: style, Size: size, Station: 'Station A', Status: 'Pending', Completion: 'In progress'
            }
        })
            .then(res => {
                if (res.data)
                    callback();
            })
    }

    const addOrder = async (callback) => {
        await axios.post('/api/orders/', { orderID, colour, style, size })
            .then(res => {
                if (res.data)
                    callback();
            })
            .catch(error => {
                if (error.response) {
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    setAddSuccess({ severity: 'error', message: 'Order Adding Failed!' });
                }
            });
    }

    const updateHistory = async (callback) => {
        await axios.post('/api/histories/', {
            orderID, context: 'Update', description: {
                Colour: updateColour, Style: updateStyle, Size: updateSize, Station: updateStation,
                Status: updateStationedStatus, Completion: updateOrderStatus
            }
        })
            .then(res => {
                if (res.data)
                    callback();
            })
    }

    const updateOrder = async (callback) => {
        await axios.put('/api/orders/updateOrder', {
            orderID,
            colour: updateColour,
            style: updateStyle,
            size: updateSize,
            stationedIn: updateStation,
            stationedStatus: updateStationedStatus,
            orderStatus: updateOrderStatus
        })
            .then(res => {
                if (res.data === 'OK')
                    callback();
            })
            .catch(error => {
                if (error.response) {
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    setUpdateSuccess({ severity: 'error', message: 'Order Updating Failed!' });
                }
            });
    }

    const checkOrder = async () => {
        await axios.get('/api/orders/getOrder/' + orderID)
            .then(res => {
                if (res.data.length !== 0)
                    setOrder((res.data)[0]);

                setOrderForm(true);
            })
    }

    const handleSnackAddClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAddSnackOpen(false);
    };

    const handleSnackUpdateClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setUpdateSnackOpen(false);
    };

    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={300}
            classNames='fade'
        >
            <>
                <header className='app-header'>
                    <div className='brand'>
                        <Typography className='brand-name' variant="h5">Traos</Typography>
                        <LocationSearchingIcon className='brand-logo' />
                    </div>
                    <nav className='nav'>
                        <ul className='nav-list'>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/orders">Orders</Link></li>
                            <li><Link href="/stations">Stations</Link></li>
                            <li><Link href="/about">About</Link></li>
                            <li><Link href="/help">Help</Link></li>
                        </ul>
                    </nav>
                </header>
                <section className='app-sectionA'>
                    <div className='title'>
                        <Typography variant="h6">
                            Inquiries <small className={classes.title}>for order </small>
                        </Typography>
                    </div>
                    <div className='body'>
                        <div className='intro'>
                            <Typography variant="body1">Inquire for tracking an Order</Typography>
                        </div>

                        {!orderForm ? (
                            <OrderForm
                                handleSubmit={handleSubmit}
                                orderID={orderID}
                                setOrderID={setOrderID}
                            />
                        ) :
                            order ? (
                                <Record
                                    order={order}
                                    updateColour={updateColour}
                                    setUpdateColour={setUpdateColour}
                                    updateStyle={updateStyle}
                                    setUpdateStyle={setUpdateStyle}
                                    updateSize={updateSize}
                                    setUpdateSize={setUpdateSize}
                                    updateStation={updateStation}
                                    setUpdateStation={setUpdateStation}
                                    updateStationedStatus={updateStationedStatus}
                                    setUpdateStationedStatus={setUpdateStationedStatus}
                                    updateOrderStatus={updateOrderStatus}
                                    setUpdateOrderStatus={setUpdateOrderStatus}
                                    handleClose={handleClose}
                                    handleUpdate={handleUpdate}
                                    updateSnackOpen={updateSnackOpen}
                                    handleSnackUpdateClose={handleSnackUpdateClose}
                                    updateSuccess={updateSuccess}
                                />
                            ) : (
                                    <div className='order'>
                                        <Typography variant="body2">
                                            Hmm. This order looks like new as it does not available in the system.
                                        </Typography>
                                        <div className='options'>
                                            <AddOrder
                                                orderID={orderID}
                                                colour={colour}
                                                setColour={setColour}
                                                style={style}
                                                setStyle={setStyle}
                                                size={size}
                                                setSize={setSize}
                                                handleClose={handleClose}
                                                handleAdd={handleAdd}
                                                addSnackOpen={addSnackOpen}
                                                handleSnackAddClose={handleSnackAddClose}
                                                addSuccess={addSuccess}
                                            />
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </section>
            </>
        </CSSTransition >
    )
}