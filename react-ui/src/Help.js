import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';

import './App.css';

class Help extends React.Component {
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
                            <Typography variant="h6">Help</Typography>
                        </div>
                        <div className='body'>
                            <div className='intro'>
                                <Typography variant="body2">Need Help? | Contact Us.</Typography>
                            </div>
                            <div className='trunk'>
                                <div className='tField2'>
                                    <div className='text2'>
                                        <Typography className="accent2" variant="h6"><CallIcon fontSize="large" /> &nbsp; Mobile1</Typography>
                                        <Typography className='text2b' variant="caption">+94711319232</Typography>
                                    </div>
                                    <div className='text2'>
                                        <Typography className="accent2" variant="h6"><CallIcon fontSize="large" /> &nbsp; Mobile2</Typography>
                                        <Typography className='text2b' variant="caption">+94770610046</Typography>
                                    </div>
                                    <div className='text2'>
                                        <Typography className="accent2" variant="h6"><EmailIcon fontSize="large" /> &nbsp; Email</Typography>
                                        <Typography className='text2b' variant="caption">chansanfdo@gmail.com</Typography>
                                    </div>
                                    <div className='text2'>
                                        <Typography className="accent2" variant="h6"><LinkedInIcon fontSize="large" />&nbsp; LinkedIn</Typography>
                                        <Typography className='text2b' variant="caption">
                                            <Link href="https://www.linkedin.com/in/sandeep-fernando-58b80019b">
                                                LinkedIn
                                            </Link>
                                        </Typography>
                                    </div>
                                    <div className='text2'>
                                        <Typography variant="h6"><GitHubIcon /> &nbsp; GitHub</Typography>
                                        <Typography className='text2b' variant="caption">
                                            <Link href="https://github.com/lizardkingLK">
                                                GitHub
                                            </Link>
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

export default Help;
