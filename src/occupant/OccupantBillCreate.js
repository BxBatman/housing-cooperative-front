import React, {Component} from 'react';
import {Button, Col, FormControl, FormGroup, Glyphicon, Grid, HelpBlock, Label, Row} from 'react-bootstrap';
import axios from 'axios';
import {Trans} from 'react-i18next';
import {withNamespaces} from 'react-i18next';
import {NotificationManager} from "react-notifications";

class OccupantBillCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            electricity: "",
            gas: "",
            coldWater: "",
            hotWater: "",
            heating: "",
            id: props.location.state.id
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };


    OnOccupantBillCreateSubmit = (e) => {
        e.preventDefault();


        axios.post("http://localhost:8080/premises/bill/" + this.state.id, {
            electricity: this.state.electricity,
            gas: this.state.gas,
            coldWater: this.state.coldWater,
            hotWater: this.state.hotWater,
            heating: this.state.heating
        }, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        }).then(response => {
            if (localStorage.getItem('role') === "ROLE_ADMIN") {
                this.props.history.goBack();
            } else {

                this.props.history.push("/occupantPremises");
            }
        }).catch(error => {
            NotificationManager.error("Could not add");
        })


    }

    render() {
        console.log(this.state.id);
        return (
            <Grid>
                <Row className="show-grid">
                    <form onSubmit={this.OnOccupantBillCreateSubmit}>
                        <Col xs={6} xsOffset={3}>
                            <FormGroup>
                                <Label><Trans>Electricity</Trans></Label>
                                <FormControl
                                    type="text"
                                    name="electricity"
                                    id="electricity"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label><Trans>Gas</Trans></Label>
                                <FormControl
                                    type="text"
                                    name="gas"
                                    id="gas"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label><Trans>Cold water</Trans></Label>
                                <FormControl
                                    type="text"
                                    name="coldWater"
                                    id="coldWater"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label><Trans>Hot water</Trans></Label>
                                <FormControl
                                    type="text"
                                    name="hotWater"
                                    id="hotWater"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label><Trans>Heating</Trans></Label>
                                <FormControl
                                    type="text"
                                    name="heating"
                                    id="heating"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                        </Col>
                        <FormGroup>
                            <Col xs={3} xsOffset={8}>
                                <Button type="submit" style={{height: 35, width: 60}}
                                        bsStyle="success"><Trans>Add</Trans></Button>

                            </Col>
                        </FormGroup>
                    </form>
                </Row>
            </Grid>


        )

    }

}

export default withNamespaces()(OccupantBillCreate);