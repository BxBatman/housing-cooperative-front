import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './Login';
import Buildings from './Buildings';
import App from './App';
import Occupants from './Occupants';
import './i18n';

ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route path="/" component={App} />
            <Route path="/login" component={Login}/>
            <Route path="/buildings" component={Buildings}/>
            <Route path="/occupants" component={Occupants}/>
        </div>

    </BrowserRouter>
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
), document.getElementById('root'));
serviceWorker.unregister();
