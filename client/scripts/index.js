import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';

import {Navbar, Nav, NavItem} from 'react-bootstrap';

var Header = React.createClass({
  render: function() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">
              The Harvard Open Data Project
            </a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="https://github.com/Harvard-Open-Data-Project/hodp">GitHub</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="https://dataverse.harvard.edu/dataverse/harvardopendata">Our Datasets</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/get-involved">Get Involved</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/about">About</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

let Footer = React.createClass({
  render: function() {
      let year = new Date().getFullYear();
    return (
      <footer className="footer well">
        <div className="container">
          <p className="text-muted text-center">
              Copyright &copy; {year}
          </p>
        </div>
      </footer>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <div className="container">
          <Router.RouteHandler/>
        </div>
        <Footer />
      </div>
    );
  }
});

let pages = {
  Home: require('../routes/Home'),
  About: require('../routes/About'),
  GetInvolved: require('../routes/GetInvolved')
};

let routes = (
  <Router.Route name="app" path="/" handler={App}>
    <Router.Route name="home" path="/" handler={pages.Home}/>
    <Router.Route name="about" path="/about" handler={pages.About}/>
    <Router.Route name="getinvolved" path="/get-involved" handler={pages.GetInvolved}/>
    <Router.DefaultRoute handler={pages.Home}/>
  </Router.Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  ReactDOM.render(<Handler />, document.body);
});
