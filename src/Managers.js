import React, {Component} from 'react';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn, DeleteButton, InsertButton,SearchField} from 'react-bootstrap-table';
import {Row, Grid, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Trans } from 'react-i18next';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {NotificationManager, NotificationContainer} from "react-notifications";
class Managers extends Component {
    constructor(props) {
        super();
        this.state = {
            occupants: [],
            deleteText: <Trans>Delete</Trans>,
            insertText: "Insert"
        }

    };


    componentDidMount() {
        axios.get("http://localhost:8080/manag/all", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response);
            const newOccupants = response.data.map(e=>{
                return {
                    id: e.id,
                    firstname: e.firstname,
                    lastname: e.lastname,
                    email:e.email
                };
            });

            const newState = Object.assign({}, this.state, {
                occupants: newOccupants
            })
            this.setState(newState);
        }).catch(error => console.log(error))
    }

    buttonFormatter(cell, row){
        return <Link to={{
            pathname: "/managerBuildings",
            state: {
                id: row.id,
                building: false
            }

        }}><Button><Trans>Buildings</Trans></Button></Link>
    }

    buttonEditFormatter(cell, row){
        return <Link to={{
            pathname: "/editManager",
            state: {
                row: row,
            }

        }}><Button><Trans>Edit</Trans></Button></Link>
    }

    selectRowProp = {
        mode: 'radio'
    };


    handleDeleteButtonClick = (rowKeys) => {
        axios.delete("http://localhost:8080/manag/" + rowKeys, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        } ).then(response =>{
            NotificationManager.success(<Trans>Manager deleted</Trans>);
        }).catch(error => {
            console.log(error);
            NotificationManager.error(<Trans>Could not delete manager</Trans>);
        })
    }

    createCustomDeleteButton = (onClick) => {
        var text = this.state.deleteText
        return (
            <DeleteButton
                btnText= {text}
                style={{height: 35, width:80, marginRight: 5}}
                btnContextual='btn-warning'
            />
        );
    }

    confirmDelete = (next,dropRowKeys) => {
        next();
    }

    createCustomInsertButton = (onClick) => {
        var text = <Trans>{this.state.insertText}</Trans>;
        return (
            <Link to={{
                pathname: "/managerCreate"

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
            insertBtn: this.createCustomInsertButton,
            afterDeleteRow: this.handleDeleteButtonClick,
            searchField: this.createCustomSearchField,
            handleConfirmDeleteRow: this.confirmDelete
        };

        return (
            <Grid>
                <Row >
                    <Col lg={1}></Col>
                    <Col lg={10}>
                        <BootstrapTable data={this.state.occupants}
                                        search={true} selectRow={this.selectRowProp} pagination={true} options={options} insertRow deleteRow>
                            <TableHeaderColumn hidden={true} autoValue={true} dataField='id' isKey>Id</TableHeaderColumn>
                            <TableHeaderColumn dataField='firstname'><Trans>First name</Trans></TableHeaderColumn>
                            <TableHeaderColumn dataField='lastname'><Trans>Last name</Trans></TableHeaderColumn>
                            <TableHeaderColumn dataField='email'>E-mail</TableHeaderColumn>
                            <TableHeaderColumn dataFormat={this.buttonFormatter}><Trans>Buildings</Trans></TableHeaderColumn>
                            <TableHeaderColumn dataFormat={this.buttonEditFormatter}><Trans>Edit</Trans></TableHeaderColumn>
                        </BootstrapTable>
                    </Col>
                    <Col lg={1}>
                        <NotificationContainer/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default withNamespaces()(Managers);