import React, {Component} from 'react';
import {Col, Grid, Row} from 'react-bootstrap';
import Select from 'react-select';
import axios from "axios/index";


class OccupantNewPremises extends Component {

    constructor(props) {
        super();
        this.state = {
            premises:[]
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


    render() {
        return (
            <Grid>
                <Row>
                    <Col lg={2}></Col>
                    <Col lg={8}>
                        <Select options={this.state.premises}/>
                    </Col>
                    <Col lg={2}></Col>
                </Row>
            </Grid>
        )
    }


}

export default OccupantNewPremises;