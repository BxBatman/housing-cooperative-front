import React, {Component} from 'react';
import axios from 'axios';
import {Row, Grid, Col, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import {withNamespaces} from 'react-i18next';
import {Trans} from 'react-i18next';
import {Link} from 'react-router-dom';
import {InsertButton} from "react-bootstrap-table";

class Premises extends Component {
    constructor(props) {
        super();
        this.state = {
            premises: [],
            id: props.location.state.id
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

    render() {
        return (
            <Grid>
                <Row>
                    <Col lg={3}></Col>
                    <Col lg={6}>
                        <Link to={{
                            pathname: "/premisesAdd",
                            state: {id: this.state.id}
                        }}>
                            <InsertButton
                                btnText={this.state.insertText}
                                btnContextual='btn-success'
                            />
                        </Link>
                        <ListGroup>
                            {this.state.premises.map((premise, i) => <ListGroupItem key={i}>
                                {premise.id} {premise.number} <Link to={{
                                pathname: "/occupantPremisesBills",
                                state: {id: premise.id}
                            }}><Button className="pull-right" bsSize="small" bsStyle="info">Check bills
                            </Button></Link>
                            </ListGroupItem>)}
                        </ListGroup>

                    </Col>
                    <Col lg={3}></Col>
                </Row>
            </Grid>
        )
    }
}

export default withNamespaces()(Premises);