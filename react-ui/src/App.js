import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Typography from '@material-ui/core/Typography';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';

import './App.css';

class App extends React.Component {
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
                <li><a href="/">Home</a></li>
                <li><a href="/orders">Orders</a></li>
                <li><a href="/stations">Stations</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/help">Help</a></li>
              </ul>
            </nav>
          </header>
          <section className='app-sectionA'>
            <div className='title'>
              <Typography variant="h6">Home</Typography>
            </div>
            <div className='body'>
              <div className='intro'>
                <Typography variant="body2">Welcome to the Traos | A Tracking & Optimization System</Typography>
              </div>
              <div className='pack'>
                <div className='p-card'>
                  <Typography className='p-card-title' variant="button">Orders</Typography>
                  <Typography className='p-card-body' variant="h6">
                    "Track all of your orders by your manufacturers. Those items will be here."
                  </Typography>
                  <img
                    className='p-card-img'
                    src={require('./images/orders.svg')}
                    width='200'
                    height='200'
                    alt='orders.svg'
                  />
                  <Typography className='p-card-footer' variant="body2">
                    <a href='/orders'>View</a>
                  </Typography>
                </div>
                <div className='p-border'></div>
                <div className='p-card'>
                  <Typography className='p-card-title' variant="button">Stations</Typography>
                  <Typography className='p-card-body' variant="h6">
                    "Find your orders with details like the current status, where it stationed in, order details etc."
                  </Typography>
                  <img
                    className='p-card-img'
                    src={require('./images/stations.svg')}
                    width='200'
                    height='200'
                    alt='stations.svg'
                  />
                  <Typography className='p-card-footer' variant="body2">
                    <a href='/stations'>View</a>
                  </Typography>
                </div>
              </div>
            </div>
          </section>
        </>
      </CSSTransition>
    )
  }
}

export default App;
