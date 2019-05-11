import React, {Component} from 'react';
import {Col, Grid, Row} from 'react-bootstrap';
import Select from 'react-select';
import axios from "axios/index";
import Button from "react-bootstrap/es/Button";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Trans, withNamespaces} from "react-i18next";

class ManagerNewBuildings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.location.state.id,
            buildings:[],
            selectedId: null,
            choose: <Trans>Choose</Trans>
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8080/building/available", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response);
            const newBuildings = response.data.map(e => {
                return {
                    value: e.id,
                    label: e.number,

                };
            });

            const newState = Object.assign({}, this.state, {
                buildings: newBuildings
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
            NotificationManager.error("Choose building!")

        } else {
            axios.post("http://localhost:8080/manag/" + this.state.selectedId +"/" + this.state.id, {
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
                            options={this.state.buildings}/>
                        <Button type="submit" onClick={this.addPremises} style={{marginTop: 10}}  className="pull-right" bsStyle="success"><Trans>Add</Trans></Button>
                    </Col>
                    <Col lg={4}></Col>
                    <NotificationContainer/>
                </Row>
            </Grid>
        )
    }


}

export default withNamespaces()(ManagerNewBuildings);