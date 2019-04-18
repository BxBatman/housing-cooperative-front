import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './Login';
import Buildings from './Buildings';
import App from './App';
import Occupants from './Occupants';
import Premises from './Premises';
import OccupantCreate from './OccupantCreate';
import './i18n';
import Activation from './Activation';

ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route path="/" component={App} />
            <Route path="/login" component={Login}/>
            <Route path="/buildings" component={Buildings}/>
            <Route path="/occupants" component={Occupants}/>
            <Route path="/premises" component={Premises}/>
            <Route path="/occupantCreate" component={OccupantCreate}/>
            <Route path="/activation/:token" component={(props) => (
                <Activation token={props.match.params.token}/>
            )}/>
        </div>

    </BrowserRouter>
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
), document.getElementById('root'));
serviceWorker.unregister();
