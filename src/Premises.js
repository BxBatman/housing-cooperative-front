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
            id: props.location.state.id,
            isBuilding: props.location.state.building,
            insertText: <Trans>Insert</Trans>
        }

        this.onDelete = this.onDelete.bind(this);
    }


    componentDidMount() {
        var url;
        if (this.state.isBuilding) {
            url = "building/all/";
        } else {
            url = "premises/occupant/";
        }
        axios.get("http://localhost:8080/" + url + this.state.id, {
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


    onDelete = (i) => {
        console.log(i.id + " " + this.state.id);
        axios.delete("http://localhost:8080/building/" + i.id +"/"+ this.state.id, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(response => {
            var url;
            if (this.state.isBuilding) {
                url = "building/all/";
            } else {
                url = "premises/occupant/";
            }
            axios.get("http://localhost:8080/" + url + this.state.id, {
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
        }).catch(error => {
            console.log(error);
        })

    }

    render() {
        console.log(this.state.id);
        var url;


        if (this.state.isBuilding) {
            url= "/premisesAdd"
        } else {
            url= "/occupantNewPremises"
        }


        return (
            <Grid>
                <Row>
                    <Col lg={3}></Col>
                    <Col lg={6}>
                        <Link to={{
                            pathname: url,
                            state: {id: this.state.id}
                        }}>
                            <InsertButton
                                btnText={this.state.insertText}
                                style={{marginBottom: 10}}
                                btnContextual='btn-success'
                            />
                        </Link>
                        <ListGroup>
                            {this.state.premises.map((premise, i) => <ListGroupItem style={{height:50}} key={i}>
                                {premise.number} <Link to={{
                                pathname: "/occupantPremisesBills",
                                state: {id: premise.id}
                            }}><Button className="pull-right" bsSize="small" style={{marginLeft: 5}} bsStyle="info"><Trans>Check bills</Trans>
                            </Button></Link>
                                <Button className="pull-right" onClick={this.onDelete.bind(this, premise)} bsSize="small" bsStyle="danger"><Trans>Delete</Trans>
                                </Button>
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