import React, {Component} from 'react';
import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import i18n from 'i18next';
import { Trans } from 'react-i18next';

class PageNavbarOccupant extends Component {
    constructor(props) {
        super(props);
    }

    logOut = (e) => {
        localStorage.setItem("token",null);
        localStorage.setItem("role",null);
    }

    changeLngPL = (e)=> {
        localStorage.setItem("lang","pl");
        i18n.changeLanguage('pl');
    }

    changeLngEN = (e)=> {
        localStorage.setItem("lang","en");
        i18n.changeLanguage('en');
    }

    render(){

        return (
            <Navbar inverse collapseOnSelect >
                <Navbar.Header>
                    <Navbar.Brand>
                        Housing Cooperative
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>

                    <Nav>
                        <NavDropdown eventKey={3} title=<Trans>Select</Trans> id="basic-nav-dropdown">
                        <LinkContainer to="/occupantPremises">
                            <MenuItem eventKey={3.1}><Trans>Premises</Trans></MenuItem>
                        </LinkContainer>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} onClick={this.changeLngPL}>
                        PL
                    </NavItem>
                    <NavItem eventKey={1} onClick={this.changeLngEN}>
                        EN
                    </NavItem>
                    <LinkContainer to="/login">
                        <NavItem eventKey={2} onClick={this.logOut}>
                            <Trans>Log out</Trans>
                        </NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
    </Navbar>
    );

    }
}

export default PageNavbarOccupant;