import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-notifications/lib/notifications.css';
import PageNavbarAdmin from './components/PageNavbarAdmin'
import {Row, Grid, Col} from 'react-bootstrap';

class App extends Component {


  constructor(props) {
    super(props);
  }

  componentDidMount(){
    if  (localStorage.getItem("token").match(null)) {
      this.props.history.push("/login");
    }
  }


  render() {

      console.log(localStorage.getItem("role"));
      let navbar;
      if (localStorage.getItem("role").match(null)) {
          navbar = null;
      } else if (localStorage.getItem("role").match("ROLE_ADMIN")) {
          navbar = <PageNavbarAdmin/>
      }
      else {
          navbar = <PageNavbarAdmin/>
      }


      return (
          <div id="app">
              <Grid fluid>
                  <Row md={12}>
                      {navbar}
                  </Row>
              </Grid>
          </div>
      );
      const styles = {
          grid: {
              paddingLeft: 0,
              paddingRight: 0
          },
          row: {
              marginLeft: 0,
              marginRight: 0
          },
          col: {
              paddingLeft: 0,
              paddingRight: 0
          }
      };
  }
}

export default App;
