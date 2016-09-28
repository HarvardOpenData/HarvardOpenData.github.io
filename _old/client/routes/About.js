var React = require('react');
import {Jumbotron, Row, Col, PageHeader} from 'react-bootstrap';

var About = React.createClass({
	render: function() {
		return (
			<div>
				<PageHeader>About Us</PageHeader>
	          	<Row>
		            <Col xs={12} sm={6}>
		           	<h3>Who We Are</h3>
		           	<p>Students from across the University are spearheading a project to build Harvard's 
		              first open data portal, which will empower Harvard students and researchers to discover and hack with University
		              data like financial data, enrollment stats, course catalogs, and more.</p>
		           	<h4>Faculty Leadership</h4>
		           		<li>Nick Sinai, former United States Deputy CTO</li>
		           		<li>Jim Waldo, CTO, Harvard University</li>
		           		<li>Perry Hewitt, Chief Digital Officer, Harvard University</li>
		           	</Col>
		            <Col xs={12} sm={6}>
		            <h3>What We Do</h3>
		            <p>There has been a large movement toward open data in government (e.g. <a href="https://data.gov">Data.gov</a>) and in other universities (e.g. <a href="http://yoda.yale.edu/">Yale's Open Data Access Project</a>). The Harvard administration has been working on an open data portal of our own for nearly two years, and by finally bringing together all the necessary people (faculty leaders and undergraduate builders and researchers) we are making this a reality.</p>
		           	<h4>Mission Statement</h4>
	              The goal of the Harvard Open Data Project (HODP) is to leverage open data to foster community, efficiency, and student innovation. Making data public and easily accessible allows us all to unlock its potential. Data-driven progress unites people, organizations, and departments as we all try to make daily life better. Aggregating, maintaining, and publicizing open data has and will continue to be a global trend and we want Harvard to be at its forefront. Our goal is to give that progress a home with centralization of available data, integration with existing systems, and showcases of data-inspired products.
					
		            </Col>
          		</Row>
			</div>
		);
	}
});

module.exports = About;
