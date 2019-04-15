import React, {Component} from 'react';
import {Button, Col, FormControl, FormGroup, Glyphicon, Grid, HelpBlock, Label, Row} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Loader from 'react-loader-spinner'
import axios from 'axios';
import { Trans } from 'react-i18next';
import { withNamespaces } from 'react-i18next';

class OccupantCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            loading: false,
            inprogress: false
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    OnOccupantCreateSubmit = (e) => {
        e.preventDefault();

        if (this.state.inprogress === false) {

            this.setState({
                loading:true,
                inprogress: true
            })

            axios.post("http://localhost:8080/occupant", {
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
                this.props.history.push("/occupants");
            }).catch(error => {
                this.setState({
                    loading: false
                })
                NotificationManager.error("Could not add");
            })
        }

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
                    <form onSubmit={this.OnOccupantCreateSubmit}>
                        <Col xs={6} xsOffset={3}>
                            <FormGroup >
                                <Label><Trans>First name</Trans></Label>
                                <FormControl
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup >
                                <Label><Trans>Last name</Trans></Label>
                                <FormControl
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup >
                                <Label>Email</Label>
                                <FormControl
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                        </Col>
                        <FormGroup>
                            <Col xs={3} xsOffset={8}>
                                <Button type="submit" style={{height: 35, width:60}}  bsStyle="success">{data}</Button>

                            </Col>
                        </FormGroup>
                    </form>
                </Row>
                <NotificationContainer/>
            </Grid>
        )
    }

}

export default withNamespaces()(OccupantCreate);