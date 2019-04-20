import React, {Component} from 'react';
import axios from 'axios';
import {Row, Grid, Col, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn, DeleteButton, InsertButton} from 'react-bootstrap-table';
import { withNamespaces } from 'react-i18next';
import { Trans } from 'react-i18next';
import {Link} from 'react-router-dom';


class OccupantBills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bills: [],
            id:  props.location.state.id,
            buttonDisabled: false,
            pathname: "/occupantBillCreate"
        }
    }


    componentDidMount() {
        axios.get("http://localhost:8080/premises/bills/" + this.state.id, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response);
            const newBills = response.data.map(e=>{
                return {
                    id: e.id,
                    electricity: e.electricity,
                    gas: e.gas,
                    date: e.date,
                    heating: e.heating,
                    hotWater: e.hotWater,
                    coldWater: e.coldWater,
                    accepted: e.accepted

                };
            });

            const newState = Object.assign({}, this.state, {
                bills: newBills
            })
            this.setState(newState);

            response.data.filter((e) => e.accepted === true).map(e=> {
                this.setState({
                    buttonDisabled: true,
                    pathname: ""
                })
            })

        }).catch(error => console.log(error))

    }

    buttonFormatter(cell, row){
        return <Link to={{
            pathname: "/premises",
            state: {id: row.id}

        }}><Button><Trans>Premises</Trans></Button></Link>
    }

    createCustomInsertButton = (onClick) => {
        var text = this.state.insertText;
        return (
            <Link to={{
                pathname: this.state.pathname,
                state: {id: this.state.id}
            }}>
                <InsertButton
                    btnText={text}
                    btnContextual='btn-success'
                    disabled={this.state.buttonDisabled}
                />
            </Link>
        );
    }


    render() {

        const options = {
            insertBtn: this.createCustomInsertButton
        };

        return (
            <Grid>
                <Row >
                    <Col lg={2}></Col>
                    <Col lg={8}>
                        <BootstrapTable data={this.state.bills}
                                        search={true}  pagination={true} options={options} insertRow >
                            <TableHeaderColumn hidden={true} autoValue={true} dataField='id' isKey>Id</TableHeaderColumn>
                            <TableHeaderColumn dataField='electricity'><Trans>Electricity</Trans></TableHeaderColumn>
                            <TableHeaderColumn dataField='gas'><Trans>Gas</Trans></TableHeaderColumn>
                            <TableHeaderColumn dataField='heating'>Heating</TableHeaderColumn>
                            <TableHeaderColumn dataField='date'>Date</TableHeaderColumn>
                            <TableHeaderColumn dataField='hotWater'>Hot water</TableHeaderColumn>
                            <TableHeaderColumn dataField='coldWater'>Cold water</TableHeaderColumn>
                            <TableHeaderColumn dataField='accepted'>Accepted</TableHeaderColumn>
                        </BootstrapTable>
                    </Col>
                    <Col lg={2}></Col>
                </Row>
            </Grid>
        )
    }

}

export default OccupantBills;