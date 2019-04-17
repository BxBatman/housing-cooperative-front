import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Row, Grid, Col, Button} from 'react-bootstrap';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Trans } from 'react-i18next';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import axios from 'axios';

class Bills extends Component {
    constructor(props) {
        super();
        this.state = {
            bills:[]
        }
    }

render() {

        return(
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
                    <Col lg={2}></Col>
                </Row>
            </Grid>
        )
}

}