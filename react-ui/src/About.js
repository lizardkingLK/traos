import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';

import './App.css';

class About extends React.Component {
    render() {
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
                            <Typography variant="h6">About</Typography>
                        </div>
                        <div className='body'>
                            <div className='intro'>
                                <Typography variant="body2">Version 1.0</Typography>
                            </div>
                            <div className='trunk'>
                                <div className='tField'>
                                    <div className='img'>
                                        <img src={require('./images/hello.svg')} alt='hello.svg' height='250' width='250' />
                                    </div>
                                    <div className='text'>
                                        <Typography className="accent" variant="h6">Hello</Typography>
                                        <Typography variant="body2">
                                            Welcome to Traos&copy;. Track the manufacture of order optimization and processing.
                                        </Typography>
                                    </div>
                                </div>
                                <div className='tField'>
                                    <div className='img'>
                                        <img src={require('./images/orders.svg')} alt='orders.svg' height='250' width='250' />
                                    </div>
                                    <div className='text'>
                                        <Typography className="accent" variant="h6">Orders</Typography>
                                        <Typography variant="body2">
                                            View all of the orders details & the history + Track times.
                                        </Typography>
                                    </div>
                                </div>
                                <div className='tField'>
                                    <div className='img'>
                                        <img src={require('./images/stations.svg')} alt='stations.svg' height='250' width='250' />
                                    </div>
                                    <div className='text'>
                                        <Typography className="accent" variant="h6">Stations</Typography>
                                        <Typography variant="body2">
                                            Stations and the currently processing orders of the station. Check the status of the order.
                                        </Typography>
                                    </div>
                                </div>
                                <div className='tField'>
                                    <div className='img'>
                                        <img src={require('./images/inquiries.svg')} alt='inquiries.svg' height='250' width='250' />
                                    </div>
                                    <div className='text'>
                                        <Typography className="accent" variant="h6">Inquiries</Typography>
                                        <Typography variant="body2">
                                            Works with QR codes. Can add new order or update an existing one.
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </CSSTransition>
            </>
        )
    }
}

export default About;
