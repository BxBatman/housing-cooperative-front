import React, {Component} from 'react';
import axios from 'axios';
import {Row, Grid, Col, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn, DeleteButton, InsertButton, SearchField} from 'react-bootstrap-table';
import {withNamespaces} from 'react-i18next';
import {Trans} from 'react-i18next';
import {Link} from 'react-router-dom';
import {NotificationManager, NotificationContainer} from "react-notifications";


class OccupantBills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bills: [],
            id: props.location.state.id,
            buttonDisabled: false,
            pathname: "/occupantBillCreate",
            insertText: <Trans>Insert</Trans>
        }
    }



    downloadBills() {
        axios.get("http://localhost:8080/premises/bills/" + this.state.id, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response);
            const newBills = response.data.map(e => {
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

            const counter = response.data.filter((e) => e.accepted === false)
            if(counter.length > 0) {
                this.setState({
                    buttonDisabled: true,
                    pathname: ""
                })
            } else {
                this.setState({
                    buttonDisabled: false,
                    pathname: "/occupantBillCreate"
                })
            }

        }).catch(error => console.log(error))

    }





    componentDidMount() {
       this.downloadBills();
    }

    acceptBill(row){
        axios.put("http://localhost:8080/premises/bill/accept/" + row.id, {}, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        }).then(response => {
            console.log(response);
            NotificationManager.success(<Trans>Bill accepted</Trans>);
            this.downloadBills();

        }).catch(error => {
            console.log(error);
            NotificationManager.error(Error);
        })

    }

    generatePDF(row) {
        axios.get("http://localhost:8080/bill/pdf/"+ localStorage.getItem("login") +"/" + row.id + "/" +localStorage.getItem("lang"), {
            responseType: 'blob',
            headers: {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": 'application/json',
                "Accept": 'application/pdf'
            }
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'bill' +row.id +'.pdf');
            document.body.appendChild(link);
            link.click();

        }).catch(error=>{
            console.log(error);
        })
    }

    createCustomSearchField = (props) => {
        return (
            <SearchField
                placeholder=" "/>
        );
    }


    buttonFormatter(cell, row) {
        if (row.accepted === true) {
            return <Button disabled ={true}>Done</Button>
        } else {
            return <Button onClick={() => this.acceptBill(row)} ><Trans>Accept</Trans></Button>
        }
    }

    buttonPdfFormatter(cell,row) {
        if (row.accepted === true) {
            return <Button onClick={()=>this.generatePDF(row)}>Generate</Button>
        } else {
            return <Button disabled={true} >Generate</Button>
        }
    }

    render() {

        let data;
        let dataOccupant;

        if (localStorage.getItem("role") === "ROLE_ADMIN" || localStorage.getItem("role") === "ROLE_MANAGER") {
            data = <TableHeaderColumn dataFormat={this.buttonFormatter.bind(this)}><Trans>Accept</Trans></TableHeaderColumn>
        }

        if(localStorage.getItem("role") === "ROLE_OCCUPANT") {
            dataOccupant = <TableHeaderColumn dataFormat={this.buttonPdfFormatter.bind(this)} dataField='pdf'>PDF</TableHeaderColumn>
        }

        const options = {
            searchField: this.createCustomSearchField
        };

        return (
            <Grid>
                <Row>
                    <Col lg={1}></Col>
                    <Col lg={10}>
                        <Link to={{
                            pathname: this.state.pathname,
                            state: {id: this.state.id}
                        }}>
                            <InsertButton
                                btnText={this.state.insertText}
                                btnContextual='btn-success'
                                disabled={this.state.buttonDisabled}
                            />
                        </Link>
                        <BootstrapTable data={this.state.bills}
                                        search={true} pagination={true} options={options}>
                            <TableHeaderColumn hidden={true} autoValue={true} dataField='id'
                                               isKey>Id</TableHeaderColumn>
                            <TableHeaderColumn dataField='electricity'><Trans>Electricity</Trans></TableHeaderColumn>
                            <TableHeaderColumn dataField='gas'><Trans>Gas</Trans></TableHeaderColumn>
                            <TableHeaderColumn dataField='heating'><Trans>Heating</Trans></TableHeaderColumn>
                            <TableHeaderColumn dataField='hotWater'><Trans>Hot water</Trans></TableHeaderColumn>
                            <TableHeaderColumn dataField='coldWater'><Trans>Cold water</Trans></TableHeaderColumn>
                            <TableHeaderColumn dataField='date'><Trans>Date</Trans></TableHeaderColumn>
                            <TableHeaderColumn dataField='accepted'><Trans>Accepted</Trans></TableHeaderColumn>
                            {data}
                            {dataOccupant}
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

export default withNamespaces()(OccupantBills);