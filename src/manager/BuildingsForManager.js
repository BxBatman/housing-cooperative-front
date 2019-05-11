import React, {Component} from 'react';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn, DeleteButton, InsertButton, SearchField} from 'react-bootstrap-table';
import {Row, Grid, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Trans } from 'react-i18next';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {NotificationManager, NotificationContainer} from "react-notifications";
class BuildingsForManager extends Component {
    constructor(props) {
        super();
        this.state = {
            id: localStorage.getItem("id"),
            buildings: [],
            deleteText: <Trans>Delete</Trans>,
            insertText: <Trans>Insert</Trans>
        }

    };


    componentDidMount() {
        axios.get("http://localhost:8080/building/manager/" + this.state.id, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response);
            const newBuildings = response.data.map(e=>{
                return {
                    id: e.id,
                    number: e.number,
                };
            });

            const newState = Object.assign({}, this.state, {
                buildings: newBuildings
            })
            this.setState(newState);
        }).catch(error => console.log(error))
    }

    buttonFormatter(cell, row){
        return <Link to={{
            pathname: "/managerPremises",
            state: {
                id: row.id,
                building: true
            }

        }}><Button><Trans>Premises</Trans></Button></Link>
    }

    selectRowProp = {
        mode: 'radio'
    };


    handleDeleteButtonClick = (rowKeys) =>{


        axios.delete("http://localhost:8080/occupant/" + rowKeys, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        } ).then(response =>{
            NotificationManager.success("Occupant deleted");
        }).catch(error => {
            console.log(error);
            NotificationManager.error("Could not delete occupant");
        })




    }

    createCustomDeleteButton = (rowKeys) => {
        var text = this.state.deleteText
        return (
            <DeleteButton
                btnText= {text}
                style={{height: 35, width:80, marginRight: 5}}
                btnContextual='btn-warning'
            />
        );
    }

    createCustomInsertButton = (onClick) => {
        var text = this.state.insertText;
        return (
            <Link to={{
                pathname: "/managerNewBuildings",
                state: {
                    id: this.state.id,
                }
            }}>
                <InsertButton
                    btnText={text}
                    style={{height: 35, width:80}}
                    btnContextual='btn-success'
                />
            </Link>
        );
    }


    createCustomSearchField = (props) => {
        return (
            <SearchField
                placeholder=" "/>
        );
    }


    render() {

        const options = {
            deleteBtn: this.createCustomDeleteButton,
            afterDeleteRow: this.handleDeleteButtonClick,
            insertBtn: this.createCustomInsertButton,
            searchField: this.createCustomSearchField
        };

        return (
            <Grid>
                <Row >
                    <Col lg={2}></Col>
                    <Col lg={8}>
                        <BootstrapTable data={this.state.buildings}
                                        search={true} selectRow={this.selectRowProp} pagination={true} options={options}>
                            <TableHeaderColumn hidden={true} autoValue={true} dataField='id' isKey>Id</TableHeaderColumn>
                            <TableHeaderColumn dataField='number'><Trans>Number</Trans></TableHeaderColumn>
                            <TableHeaderColumn dataFormat={this.buttonFormatter}><Trans>Premises</Trans></TableHeaderColumn>
                        </BootstrapTable>
                    </Col>
                    <Col lg={2}>
                        <NotificationContainer/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default withNamespaces()(BuildingsForManager);