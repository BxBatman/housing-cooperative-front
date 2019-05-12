import React, {Component} from 'react';
import axios from 'axios';
import {Row, Grid, Col, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { withNamespaces } from 'react-i18next';
import { Trans } from 'react-i18next';
import {Link} from 'react-router-dom';

class OccupantPremises extends Component {
    constructor(props) {
        super();
        this.state = {
            premises: [],
            id: localStorage.getItem("id")
        }
    }


    componentDidMount() {
        axios.get("http://localhost:8080/premises/occupant/" + this.state.id, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response);
            const newPremises = response.data.map(e => {
                return {
                    id: e.id,
                    number: e.number
                };
            });

            const newState = Object.assign({}, this.state, {
                premises: newPremises
            })
            this.setState(newState);
        }).catch(error => console.log(error));
    }

    render(){
        return (
            <Grid>
                <Row>
                    <Col lg={3}></Col>
                    <Col lg={6}>
                        <h3><Trans>List of premises</Trans>: </h3>
                        <ListGroup>
                            {this.state.premises.map((premise,i) => <ListGroupItem key={i} style={{height:50}}>
                                <Trans>Number</Trans>: {premise.number}  <Link to={{
                                pathname: "/occupantPremisesBills",
                                state: {id: premise.id}
                            }}><Button className="pull-right" bsSize="small" bsStyle="info"><Trans>Check bills</Trans>
                            </Button></Link>
                            </ListGroupItem>)}
                        </ListGroup>
                        <NotificationContainer/>
                    </Col>
                    <Col lg={3}></Col>
                </Row>
            </Grid>
        )
    }
}

export default withNamespaces()(OccupantPremises);