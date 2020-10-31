import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';

import './App.css';

class NotFound extends React.Component {
    render() {
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
                            <Typography variant="h6">404 Not Found</Typography>
                        </div>
                    </section>
                    <section className='app-sectionB'>
                        <Typography variant="button">Sorry! That page isn't here.</Typography>
                        <img
                            src={require('./images/404.svg')}
                            width='400'
                            height='400'
                            alt='404.svg'
                            className='img'
                        />
                    </section>
                </>
            </CSSTransition>
        )
    }
}

export default NotFound;
