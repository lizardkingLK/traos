import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Orders from './Orders';
import Stations from './Stations';
import About from './About';
import Help from './Help';
import NotFound from './NotFound';
import Inquiries from './Inquiries';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <>
            <Switch>
                <Route exact path='/' component={App}></Route>
                <Route path='/orders' component={Orders}></Route>
                <Route path='/stations' component={Stations}></Route>
                <Route path='/about' component={About}></Route>
                <Route path='/help' component={Help}></Route>
                <Route exact path='/inquiries/' component={Inquiries}></Route>
                <Route path='/inquiries/:id' component={Inquiries}></Route>
                <Route component={NotFound}></Route>
            </Switch>
        </>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
