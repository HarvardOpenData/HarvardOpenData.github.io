var React = require('react');
import {Jumbotron, Row, Col} from 'react-bootstrap';

var About = React.createClass({
	render: function() {
		return (
			<div>
				<Jumbotron>
		            <h2>About Us</h2>
	          	</Jumbotron>
	          	<Row>
		            <Col xs={12} sm={6}>
		           	<h3>Who We Are</h3>
		           	<h2>Faculty Leadership</h2>
		           		<li>Nick Sinai, former United States Deputy CTO</li>
		           		<li>Jim Waldo, CTO, Harvard University</li>
		           		<li>Perry Hewitt, Chief Digital Officer, Harvard University</li>
		           	
		           	</Col>
		            <Col xs={12} sm={6}>
		            <h3>What We Do</h3>
		            <p>There has been a large movement toward open data in government (e.g. <a href="https://data.gov">Data.gov</a>) and in other universities (e.g. <a href="http://yoda.yale.edu/">Yale's Open Data Access Project</a>). The Harvard administration has been working on an open data portal of our own for nearly two years, and by finally bringing together all the necessary people (faculty leaders and undergraduate builders and researchers) we are finally making this a reality.</p>
		           	
		            </Col>
          		</Row>
			</div>
		);
	}
});

module.exports = About;
