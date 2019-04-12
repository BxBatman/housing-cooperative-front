import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {Row, Grid, Col} from 'react-bootstrap';
import axios from 'axios';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import { withNamespaces } from 'react-i18next';
import { Trans } from 'react-i18next';

class Buildings extends Component {
    constructor(props) {
        super();
        this.state = {
            buildings: [],
            columns: [{
                dataField: 'id',
                text: <Trans>Building ID</Trans>
            }, {
                dataField: 'number',
                text: <Trans>Buildings</Trans>
            }]
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


    render() {

        const {SearchBar} = Search;


        return (
            <Grid>
                <Row>
                    <Col lg={3}></Col>
                    <Col lg={6}>
                        <ToolkitProvider
                            keyField="id"
                            data={this.state.buildings}
                            columns={this.state.columns}
                            search
                        >

                            {
                                props => (
                                    <div>
                                        <h3><Trans>Search through table</Trans></h3>
                                        <SearchBar { ...props.searchProps } />
                                        <hr />
                                        <BootstrapTable
                                            { ...props.baseProps }
                                        />
                                    </div>
                                )
                            }

                        </ToolkitProvider>

                    </Col>
                    <Col lg={3}></Col>
                </Row>
            </Grid>
        )
    }
}

export default withNamespaces()(Buildings);