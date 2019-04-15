import React, {Component} from 'react';
import {Row, Grid, Col} from 'react-bootstrap';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';
import { withNamespaces } from 'react-i18next';
import { Trans } from 'react-i18next';

class Buildings extends Component {
    constructor(props) {
        super();
        this.state = {
            buildings: [],
            deleteText: <Trans>Delete</Trans>
        }
    };

    componentDidMount() {
        axios.get("http://localhost:8080/building/all",{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response);
            const newBuildings = response.data.map(e => {
                return {
                    id: e.id,
                    number: e.number
                };
            });
            const newState = Object.assign({}, this.state, {
                buildings: newBuildings
            })
            this.setState(newState);
        }).catch(error => console.log(error))
    }

    handleDeleteButtonClick = (onClick) => {
        // Custom your onClick event here,
        // it's not necessary to implement this function if you have no any process before onClick
        console.log('This is my custom function for DeleteButton click event');
        onClick();
    }

    createCustomDeleteButton = (onClick) => {
        var text = this.state.deleteText
        return (
            <DeleteButton
                btnText= {text}
                btnContextual='btn-warning'
                onClick={ () => this.handleDeleteButtonClick(onClick) }/>
        );
    }


    selectRowProp = {
        mode: 'radio'
    };

    render() {

        const options = {
            deleteBtn: this.createCustomDeleteButton
        };

        return (
            <Grid>
                <Row>
                    <Col lg={3}></Col>
                    <Col lg={6}>
                        <BootstrapTable data={this.state.buildings} insertRow={true}
                                        search={true} selectRow={this.selectRowProp} pagination={true}  options={options} deleteRow>
                            <TableHeaderColumn hidden={true} autoValue={true} dataField='id' isKey>Id</TableHeaderColumn>
                            <TableHeaderColumn dataField='number'>Number</TableHeaderColumn>
                        </BootstrapTable>

                    </Col>
                    <Col lg={3}></Col>
                </Row>
            </Grid>
        )
    }
}

export default withNamespaces()(Buildings);