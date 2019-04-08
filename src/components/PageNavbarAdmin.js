import React, {Component} from 'react';
import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


class PageNavbarAdmin extends Component {
    constructor(props) {
        super(props);
    }

    logOut = (e) => {
        localStorage.setItem("token",null);
        localStorage.setItem("role",null);
    }

    render(){

        return (
            <Navbar inverse collapseOnSelect >
                <Navbar.Header>
                    <Navbar.Brand>
                        Car Management
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>

                    <Nav>
                        <NavDropdown eventKey={3} title="Select" id="basic-nav-dropdown">
                            <LinkContainer to="/buildings">
                                <MenuItem eventKey={3.1}>Buildings</MenuItem>
                            </LinkContainer>
                            <LinkContainer to="/occupants">
                                <MenuItem eventKey={3.2}>Occupants</MenuItem>
                            </LinkContainer>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <LinkContainer to="/login">
                            <NavItem eventKey={1} onClick={this.logOut}>
                                Log out
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );

    }
}

export default PageNavbarAdmin;