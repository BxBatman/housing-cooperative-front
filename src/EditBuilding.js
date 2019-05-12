import React, {Component} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {Button, Col, FormControl, FormGroup, Glyphicon, Grid, HelpBlock, Label, Row} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Loader from 'react-loader-spinner'
import axios from 'axios';
import { Trans } from 'react-i18next';
import { withNamespaces } from 'react-i18next';

class BuildingCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.location.state.row.id,
            number: props.location.state.row.number,
            numberDescriptionValid: null,
            numberBlockText: null,
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    OnOccupantCreateSubmit = (e) => {
        e.preventDefault();



        if (this.state.number === "" || !/^[a-zA-Z0-9]*$/.test(this.state.number) ) {
            this.setState({
                numberDescriptionValid: "error",
                numberBlockText: "Invalid number",
            })
        } else {
            this.setState({
                numberDescriptionValid: null,
                numberBlockText: null,
            })


            axios.put("http://localhost:8080/building", {
                id: this.state.id,
                number: this.state.number,

            }, {
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            }).then(response => {
                this.props.history.goBack();
            }).catch(error => {
                NotificationManager.error("Could not add");
            })

        }
    }

    render() {

        return (
            <Grid>
                <Row className="show-grid">
                    <form onSubmit={this.OnOccupantCreateSubmit}>
                        <Col xs={6} xsOffset={3}>
                            <FormGroup validationState={this.state.numberDescriptionValid} >
                                <Label><Trans>Number</Trans></Label>
                                <FormControl
                                    type="text"
                                    name="number"
                                    id="number"
                                    value={this.state.number}
                                    onChange={this.handleChange}
                                />
                                <HelpBlock>{this.state.numberBlockText}</HelpBlock>
                            </FormGroup>
                        </Col>
                        <FormGroup>
                            <Col xs={3} xsOffset={8}>
                                <Button type="submit" style={{height: 35, width:100}}  bsStyle="success"><Trans>Edit</Trans></Button>

                            </Col>
                        </FormGroup>
                    </form>
                </Row>
                <NotificationContainer/>
            </Grid>
        )
    }

}

export default withNamespaces()(BuildingCreate);