import React, {Component} from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import {Row, Grid, Col, Button} from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import {LinkContainer} from 'react-router-bootstrap';
import { Trans } from 'react-i18next';
class Occupants extends Component {
    constructor(props) {
        super();
        this.state = {
            occupants: [],
            columns:[{
                dataField: 'id',
                text: <Trans>Occupant ID</Trans>
            }, {
                dataField:'firstname',
                text: <Trans>First name</Trans>
            }, {
                dataField:'lastname',
                text: <Trans>Last name</Trans>
            }, {
                dataField: 'email',
                text: 'E-mail'
            }, {
                dataField: 'button',
                text: <Trans>Costs</Trans>
            }],
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
                  email:e.email,
                  button: <LinkContainer to={"/costs/"+ e.id} ><Button><Trans>Check costs</Trans></Button></LinkContainer>
              };
          });

          const newState = Object.assign({}, this.state, {
              occupants: newOccupants
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
                            data={this.state.occupants}
                            columns={this.state.columns}
                            search
                        >

                            {
                                props => (
                                    <div>
                                        <h3><Trans>Search through table</Trans></h3>
                                        <SearchBar { ...props.searchProps } placeholder=" " />
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

export default withNamespaces()(Occupants);