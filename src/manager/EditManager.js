import React, {Component} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {Button, Col, Form, FormControl, FormGroup, Glyphicon, Grid, HelpBlock, Label, Row} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Loader from 'react-loader-spinner'
import axios from 'axios';
import {Trans} from 'react-i18next';
import {withNamespaces} from 'react-i18next';

class EditManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.location.state.row.id,
            firstname: props.location.state.row.firstname,
            lastname: props.location.state.row.lastname,
            email: props.location.state.row.email,
            firstnameDescriptionValid: null,
            firstnameBlockText: null,
            lastnameDescriptionValid: null,
            lastnameBlockText: null,
            valid: true,
            emailDescriptionValid: null,
            emailBlockText: null,
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    OnManagerCreateSubmit = (e) => {
        e.preventDefault();

        if (this.state.firstname === "" || !/^[a-zA-Z]+$/.test(this.state.firstname)) {
            this.setState({
                firstnameDescriptionValid: "error",
                firstnameBlockText: "Invalid firstname",
                valid: false
            })
        } else {
            this.setState({
                firstnameDescriptionValid: null,
                firstnameBlockText: null,
                valid: true
            })
        }

        if (this.state.lastname === "" || !/^[a-zA-Z]+$/.test(this.state.lastname)) {
            this.setState({
                lastnameDescriptionValid: "error",
                lastnameBlockText: "Invalid last name",
                valid: false
            })
        } else {
            this.setState({
                lastnameDescriptionValid: null,
                lastnameBlockText: null,
                valid: true
            })
        }

        if (this.state.email === "" || !/^\S+@\S+\.\S+$/.test(this.state.email)) {
            this.setState({
                emailDescriptionValid: "error",
                emailBlockText: "Invalid email",
                valid: false
            })
        } else {
            this.setState({
                emailDescriptionValid: null,
                emailBlockText: null,
                valid: true
            })
        }


        if (this.state.valid === true) {
            this.sendEditManager();
        }


    }


    sendEditManager() {


        axios.put("http://localhost:8080/manag", {
            id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email

        }, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        }).then(response => {
            this.props.history.push("/managers");
        }).catch(error => {
            console.log(error);
            NotificationManager.error("Could not add");
        })

    }



    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Form onSubmit={this.OnManagerCreateSubmit}>
                        <Col xs={6} xsOffset={3}>
                            <FormGroup validationState={this.state.firstnameDescriptionValid}>
                                <Label><Trans>First name</Trans></Label>
                                <FormControl
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    value={this.state.firstname}
                                    onChange={this.handleChange}
                                />
                                <HelpBlock>{this.state.firstnameBlockText}</HelpBlock>
                            </FormGroup>
                            <HelpBlock/>

                            <FormGroup validationState={this.state.lastnameDescriptionValid}>
                                <Label><Trans>Last name</Trans></Label>
                                <FormControl
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    value={this.state.lastname}
                                    onChange={this.handleChange}
                                />
                                <HelpBlock>{this.state.lastnameBlockText}</HelpBlock>
                            </FormGroup>

                            <FormGroup validationState={this.state.emailDescriptionValid}>
                                <Label>Email</Label>
                                <FormControl
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <HelpBlock>{this.state.emailBlockText}</HelpBlock>
                            </FormGroup>

                        </Col>
                        <FormGroup>
                            <Col xs={3} xsOffset={8}>
                                <Button type="submit" style={{height: 35, width: 100}} bsStyle="success"><Trans>Edit</Trans></Button>

                            </Col>
                        </FormGroup>
                    </Form
                    >
                </Row>
                <NotificationContainer/>
            </Grid>
        )
    }

}

export default withNamespaces()(EditManager);