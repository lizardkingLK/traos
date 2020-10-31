import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import Skeleton from '@material-ui/lab/Skeleton';

import Table from './components/stations/Table';
import Pagination from './components/stations/Pagination';
import './App.css';
import functions from './app_meta/functions';

import axios from 'axios';
import io from 'socket.io-client';
let socket;

class App extends React.Component {
    state = {
        currentPage: 1,
        rowsPerPage: 6,
        orders: [],
        rows: [],
        isLoading: true
    }

    setIsLoading = () => {
        this.setState({ isLoading: !this.state.isLoading })
    }

    componentDidMount = () => {
        this.loadOrders();
        this.socketListen();
    }

    socketListen = async () => {
        socket = io();
        socket.emit('connected', 'new user');
        await socket.on('orders_updated', () => {
            this.updateOrders();
        });
    }

    updateOrders = async () => {
        await axios.get('/api/orders/get')
            .then(res => {
                const orders = res.data;
                const rows = orders.map(o => {
                    const stationedIn = o.stationedIn;
                    const orderID = o.orderID;
                    const createdDate = functions.FORMAT_DATE_A(o.createdDate);
                    const colour = o.colour;
                    const style = o.style;
                    const size = o.size;
                    const stationedStatus = o.stationedStatus;
                    return this.createData(stationedIn, orderID, createdDate, colour, style, size, stationedStatus)
                });
                this.setState({
                    orders: orders,
                    rows: rows
                })
            })
    }

    loadOrders = async () => {
        this.setIsLoading();
        await axios.get('/api/orders/get')
            .then(res => {
                const orders = res.data;
                const rows = orders.map(o => {
                    const stationedIn = o.stationedIn;
                    const orderID = o.orderID;
                    const createdDate = functions.FORMAT_DATE_A(o.createdDate);
                    const colour = o.colour;
                    const style = o.style;
                    const size = o.size;
                    const stationedStatus = o.stationedStatus;
                    return this.createData(stationedIn, orderID, createdDate, colour, style, size, stationedStatus)
                });
                this.setState({
                    orders: orders,
                    rows: rows
                })
            })
        this.setIsLoading();
    }

    createData = function (stationedIn, orderID, createdDate, colour, style, size, stationedStatus) {
        return { stationedIn, orderID, createdDate, colour, style, size, stationedStatus };
    }

    render() {
        const currentPage = this.state.currentPage;
        const rowsPerPage = this.state.rowsPerPage;
        const rows = this.state.rows;
        const isLoading = this.state.isLoading;

        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

        const paginate = (pageNumber) => {
            this.setState({
                currentPage: pageNumber
            })
        }

        const sortRows = (context, method) => {
            let sorted = [];
            switch (context) {
                case 'station':
                    if (method === '(A-Z)') {
                        sorted = rows.sort(function (a, b) {
                            if (a.stationedIn < b.stationedIn) return -1;
                            if (a.stationedIn > b.stationedIn) return 1;
                            return 0;
                        })
                    } else if (method === '(Z-A)') {
                        sorted = rows.sort(function (a, b) {
                            if (a.stationedIn > b.stationedIn) return -1;
                            if (a.stationedIn < b.stationedIn) return 1;
                            return 0;
                        })
                    }
                    break;
                case 'colour':
                    if (method === '(A-Z)') {
                        sorted = rows.sort(function (a, b) {
                            if (a.colour < b.colour) return -1;
                            if (a.colour > b.colour) return 1;
                            return 0;
                        })
                    } else if (method === '(Z-A)') {
                        sorted = rows.sort(function (a, b) {
                            if (a.colour > b.colour) return -1;
                            if (a.colour < b.colour) return 1;
                            return 0;
                        })
                    }
                    break;
                case 'style':
                    if (method === '(A-Z)') {
                        sorted = rows.sort(function (a, b) {
                            if (a.style > b.style) return -1;
                            if (a.style < b.style) return 1;
                            return 0;
                        })
                    } else if (method === '(Z-A)') {
                        sorted = rows.sort(function (a, b) {
                            if (a.style < b.style) return -1;
                            if (a.style > b.style) return 1;
                            return 0;
                        })
                    }
                    break;
                case 'size':
                    if (method === '(S-M-L)') {
                        sorted = rows.sort(function (a, b) {
                            if (a.size > b.size) return -1;
                            if (a.size < b.size) return 1;
                            return 0;
                        })
                    } else if (method === '(L-M-S)') {
                        sorted = rows.sort(function (a, b) {
                            if (a.size < b.size) return -1;
                            if (a.size > b.size) return 1;
                            return 0;
                        })
                    }
                    break;
                default:
                    break;
            }
            this.setState({
                rows: sorted
            })
        }

        return (
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
                <CSSTransition
                    in={true}
                    appear={true}
                    timeout={300}
                    classNames='fade'
                >
                    <section className='app-sectionA'>
                        <div className='title'>
                            <Typography variant="h6">Stations</Typography>
                        </div>
                        <div className='body'>
                            <div className='intro'>
                                <Typography variant="body2">Stations tracking | Check Order status.</Typography>
                            </div>
                            <div className='table'>
                                {isLoading ? (
                                    <>
                                        <Table
                                            rows={currentRows}
                                            sortRows={sortRows}
                                        />
                                        <Pagination
                                            rowsPerPage={rowsPerPage}
                                            totalRows={rows.length}
                                            paginate={paginate}
                                        />
                                    </>
                                ) : (
                                        <>
                                            <Skeleton variant="rect" width={'90vw'} height={420} />
                                            <Skeleton width={200} />
                                        </>
                                    )}
                            </div>
                        </div>
                    </section>
                </CSSTransition>
            </>
        )
    }
}

export default App;
