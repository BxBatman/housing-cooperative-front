import React, {Component} from 'react';
import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';
import i18n from 'i18next';
import {Trans} from 'react-i18next';

class NavbarLogin extends Component {
    constructor(props) {
        super(props);
    }

    changeLngPL = (e) => {
        i18n.changeLanguage('pl');
    }

    changeLngEN = (e) => {
        i18n.changeLanguage('en');
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        Housing Cooperative
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>

                    <Nav pullRight>
                        <NavItem eventKey={1} onClick={this.changeLngPL}>
                            PL
                        </NavItem>

                        <NavItem eventKey={2} onClick={this.changeLngEN}>
                            EN
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


        );
    }


}

export default NavbarLogin;