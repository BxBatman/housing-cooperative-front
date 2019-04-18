import React, {Component} from 'react';
import {Row, Grid, Col, Button} from 'react-bootstrap';
import axios from "axios/index";
import {withNamespaces} from "react-i18next/src/index";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


class Activation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activationToken: this.props.token,
            activated: false
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8080/user/activate/" + this.state.activationToken ,{})
            .then(response => {
                NotificationManager.info("Activation ended");
            this.setState({
                activated: true
            })
        }).catch(error => console.log(error))
    }

    render() {
        let text;
        if (this.state.activated) {
            text = "Aktywowano";
        } else {
            text = " ";
        }

        return (
            <div id="app">
                <Grid fluid>
                    <Row md={12}>
                        {text}
                    </Row>
                </Grid>
                <NotificationContainer/>
            </div>
        );
    }

}
export default Activation;