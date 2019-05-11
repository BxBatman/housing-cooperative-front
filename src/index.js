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
import OccupantPremises from './occupant/OccupantPremises';
import OccupantPremisesBills from './occupant/OccupantPremisesBills';
import OccupantBillCreate from './occupant/OccupantBillCreate';
import PremisesAdd from './PremisesAdd';
import OccupantNewPremises from './occupant/OccupantNewPremises';
import BuildingCreate from './BuildingCreate';
import Managers from './Managers';
import ManagerCreate from './manager/ManagerCreate'
import ManagerBuildings from './manager/ManagerBuildings';
import ManagerNewBuildings from "./manager/ManagerNewBuildings";
import BuildingsForManager from "./manager/BuildingsForManager";
import ManagerPremises from "./manager/ManagerPremises";

ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route path="/" component={App} />
            <Route path="/login" component={Login}/>
            <Route path="/buildings" component={Buildings}/>
            <Route path="/occupants" component={Occupants}/>
            <Route path="/premises" component={Premises}/>
            <Route path="/occupantCreate" component={OccupantCreate}/>
            <Route path="/occupantPremises" component={OccupantPremises}/>
            <Route path="/occupantPremisesBills" component={OccupantPremisesBills}/>
            <Route path="/occupantNewPremises" component={OccupantNewPremises}/>
            <Route path="/occupantBillCreate" component={OccupantBillCreate}/>
            <Route path="/activation/:token" component={(props) => (
                <Activation token={props.match.params.token}/>
            )}/>
            <Route path="/premisesAdd" component={PremisesAdd} />
            <Route path="/buildingCreate" component={BuildingCreate}/>
            <Route path="/managers" component={Managers}/>
            <Route path="/managerCreate" component={ManagerCreate}/>
            <Route path="/managerBuildings" component={ManagerBuildings}/>
            <Route path="/managerNewBuildings" component={ManagerNewBuildings}/>
            <Route path="/buildingsForManager" component={BuildingsForManager}/>
            <Route path="/managerPremises" component={ManagerPremises}/>

        </div>

    </BrowserRouter>
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
), document.getElementById('root'));
serviceWorker.unregister();
