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
        </Navbar.Collapse>
      </Navbar>
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
      </div>
    );
  }
});

let pages = {
  Home: require('../routes/Home'),
  About: require('../routes/About')
};

let routes = (
  <Router.Route name="app" path="/" handler={App}>
    <Router.Route name="home" path="/" handler={pages.Home}/>
    <Router.Route name="about" path="/about" handler={pages.About}/>
    <Router.DefaultRoute handler={pages.Home}/>
  </Router.Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  ReactDOM.render(<Handler />, document.body);
});
