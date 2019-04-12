import React, {Component} from 'react';
import {Button, FormGroup, FormControl} from "react-bootstrap";
import './css/Login.css';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from "react-notifications";
import {withRouter} from 'react-router-dom';
import { Trans } from 'react-i18next';
import { withNamespaces } from 'react-i18next';
import i18n from "i18next";


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.login.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    OnSubmit = e => {
        e.preventDefault();
        var basicAuth = "Basic " + btoa(this.state.login + ":" + this.state.password);

        console.log(this.state.login);
        console.log(this.state.password);

        console.log(basicAuth);
        axios.post("http://localhost:8080/user/login/" + this.state.login, {}, {
            headers: {
                "Authorization": basicAuth
            }
        }).then(response => {
            localStorage.setItem("token", basicAuth);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("login", this.state.login);
            localStorage.setItem("password", this.state.password);

            if (response.data.role.match("ROLE_ADMIN")) {
                this.props.history.push("/buildings");
            } else if (response.data.role.match("ROLE_OCCUPANT")) {
                this.props.history.push("/buildings");
            }
        }).catch(error => {
            NotificationManager.error("Credentials do not match");
            console.log(error);
        })

    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.OnSubmit}>
                    <FormGroup controlId="login" bsSize="large">
                        <h4>Email</h4>
                        <FormControl
                            autoFocus
                            value={this.state.login}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <h4><Trans>Password</Trans></h4>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        <Trans>Login</Trans>
                    </Button>
                    <NotificationContainer/>
                </form>
            </div>
        );

    }

}

export default withNamespaces()(Login);