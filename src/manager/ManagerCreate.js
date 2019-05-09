import React, {Component} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {Button, Col, Form, FormControl, FormGroup, Glyphicon, Grid, HelpBlock, Label, Row} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Loader from 'react-loader-spinner'
import axios from 'axios';
import { Trans } from 'react-i18next';
import { withNamespaces } from 'react-i18next';

class ManagerCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            loading: false,
            inprogress: false,
            captchaDone: false,
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

        if(this.state.email === "" || !/^\S+@\S+\.\S+$/.test(this.state.email)) {
            this.setState({
                emailDescriptionValid: "error",
                emailBlockText: "Invalid email",
                valid: false
            })
        } else {
            this.setState({
                emailDescriptionValid: null,
                emailBlockText:  null,
                valid: true
            })
        }


        if (this.state.valid === true ) {
            this.sendCreateManager();
        }


    }


    sendCreateManager() {
        if (this.state.captchaDone === true) {
            if (this.state.inprogress === false) {

                this.setState({
                    loading: true,
                    inprogress: true
                })

                axios.post("http://localhost:8080/manager", {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email

                }, {
                    headers: {
                        "Authorization": localStorage.getItem('token')
                    }
                }).then(response => {
                    this.setState({
                        loading: false
                    })
                    this.props.history.push("/managers");
                }).catch(error => {
                    this.setState({
                        loading: false
                    })
                    NotificationManager.error("Could not add");
                })
            }
        } else {
            NotificationManager.error("Solve captcha");
        }
    }

    onChangeCaptcha = () => {
        this.setState({
            captchaDone: true
        })

    }

    render() {
        let data;

        if (this.state.loading) {
            data =  <Loader
                type="Oval"
                color="#FFFFFF"
                height="19"
                width="35"
            />
        } else {
            data = <Trans>Add</Trans>;
        }

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
                                    onChange={this.handleChange}
                                />
                                <HelpBlock>{this.state.firstnameBlockText}</HelpBlock>
                            </FormGroup>
                            <HelpBlock />

                            <FormGroup validationState={this.state.lastnameDescriptionValid}>
                                <Label><Trans>Last name</Trans></Label>
                                <FormControl
                                    type="text"
                                    name="lastname"
                                    id="lastname"
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
                                    onChange={this.handleChange}
                                />
                                <HelpBlock>{this.state.emailBlockText}</HelpBlock>
                            </FormGroup>

                            <FormGroup>
                                <ReCAPTCHA
                                    sitekey="6LcCKysUAAAAAC_XBiXOVTtFwLJkmoT2btDtEdGI"
                                    onChange={this.onChangeCaptcha}
                                />
                            </FormGroup>
                        </Col>
                        <FormGroup>
                            <Col xs={3} xsOffset={8}>
                                <Button type="submit" style={{height: 35, width:60}}  bsStyle="success">{data}</Button>

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

export default withNamespaces()(ManagerCreate);