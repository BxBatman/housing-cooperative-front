import React, {Component} from 'react';
import {Button, Col, FormControl, FormGroup, Glyphicon, Grid, HelpBlock, Label, Row} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios';
import { Trans } from 'react-i18next';
import { withNamespaces } from 'react-i18next';

class OccupantCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: ''
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    OnOccupantCreateSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/occupant", {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email

        }, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        }).then(resposne => {
            NotificationManager.success("Added");
            this.props.history.push("/occupants");
        }).catch(error=>{
            NotificationManager.error("Could not add");
        })

    }


    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <form onSubmit={this.OnOccupantCreateSubmit}>
                        <Col xs={6} xsOffset={3}>
                            <FormGroup >
                                <Label>First Name</Label>
                                <FormControl
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup >
                                <Label>Last Name</Label>
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
                                <Button type="submit"  bsStyle="success"><Glyphicon glyph="plus"/> Add</Button>
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