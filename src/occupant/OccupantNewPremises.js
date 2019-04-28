import React, {Component} from 'react';
import {Col, Grid, Row} from 'react-bootstrap';
import Select from 'react-select';
import axios from "axios/index";
import Button from "react-bootstrap/es/Button";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Trans, withNamespaces} from "react-i18next";

class OccupantNewPremises extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.location.state.id,
            premises:[],
            selectedId: null,
            choose: <Trans>Choose</Trans>
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8080/premises/available", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response);
            const newPremises = response.data.map(e => {
                return {
                    value: e.id,
                    label: e.number,

                };
            });

            const newState = Object.assign({}, this.state, {
                premises: newPremises
            })
            this.setState(newState);
        }).catch(error => console.log(error))
    }


    handleChange = (selectedOption) => {
        this.setState({
            selectedId: selectedOption.value
        })
    }

    addPremises = () => {

        if(this.state.selectedId === null) {
            NotificationManager.error("Choose premises!")

        } else {
            axios.post("http://localhost:8080/occupant/" + this.state.selectedId +"/" + this.state.id, {
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
                <Row>
                    <Col lg={4}></Col>
                    <Col lg={4}>
                        <Select
                            placeholder={this.state.choose}
                            onChange={this.handleChange}
                            options={this.state.premises}/>
                        <Button type="submit" onClick={this.addPremises} style={{marginTop: 10}}  className="pull-right" bsStyle="success"><Trans>Add</Trans></Button>
                    </Col>
                    <Col lg={4}></Col>
                    <NotificationContainer/>
                </Row>
            </Grid>
        )
    }


}

export default withNamespaces()(OccupantNewPremises);