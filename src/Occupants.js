import React, {Component} from 'react';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn, DeleteButton, InsertButton} from 'react-bootstrap-table';
import {Row, Grid, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Trans } from 'react-i18next';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {NotificationManager, NotificationContainer} from "react-notifications";
class Occupants extends Component {
    constructor(props) {
        super();
        this.state = {
            occupants: [],
            deleteText: <Trans>Delete</Trans>,
            insertText: "Insert"
        }

    };


    componentDidMount() {
        axios.get("http://localhost:8080/occupant/all", {
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
            pathname: "/premises",
            state: {id: row.id}

        }}><Button><Trans>Premises</Trans></Button></Link>
    }

    selectRowProp = {
        mode: 'radio'
    };


    handleDeleteButtonClick = (onClick) => {
    }

    createCustomDeleteButton = (onClick) => {
        var text = this.state.deleteText
        return (
            <DeleteButton
                btnText= {text}
                btnContextual='btn-warning'
            />
        );
    }

    createCustomInsertButton = (onClick) => {
        var text = this.state.insertText;
        return (
            <Link to={{
                pathname: "/occupantCreate"
            }}>
            <InsertButton
                btnText={text}
                btnContextual='btn-success'
                />
            </Link>
        );
    }


    render() {

        const options = {
            deleteBtn: this.createCustomDeleteButton,
            insertBtn: this.createCustomInsertButton
        };

        return (
            <Grid>
                <Row >
                    <Col lg={2}></Col>
                    <Col lg={8}>
                        <BootstrapTable data={this.state.occupants}
                                        search={true} selectRow={this.selectRowProp} pagination={true} options={options} insertRow deleteRow>
                            <TableHeaderColumn hidden={true} autoValue={true} dataField='id' isKey>Id</TableHeaderColumn>
                            <TableHeaderColumn dataField='firstname'><Trans>First name</Trans></TableHeaderColumn>
                            <TableHeaderColumn dataField='lastname'><Trans>Last name</Trans></TableHeaderColumn>
                            <TableHeaderColumn dataField='email'>E-mail</TableHeaderColumn>
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

export default withNamespaces()(Occupants);