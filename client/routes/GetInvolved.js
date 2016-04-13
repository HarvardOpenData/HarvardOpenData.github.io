var React = require('react');
import {Jumbotron, Row, Col, PageHeader} from 'react-bootstrap';

var GetInvolved = React.createClass({
	render: function() {
		return (
			<div>
				<PageHeader>Get Involved</PageHeader>
	          	<Row>
		            <Col xs={12} sm={6}>
		              <h3>Contribute</h3>
		              <p>The Harvard Open Data Project started off as a group of students seeking to make university data more accessible. As a result of this and our values of openness and innovation, we love to have input from others. There are several ways to contribute:
			          	<h4>Data</h4>
			          	The Harvard Open Data Project aggregates data from multiple sources and depends on users to upload their own datasets. Therefore, we're always seeking to add new datasets to our collection. Check out our <a href="https://dataverse.harvard.edu/">Dataverse</a> and add datasets using our Harvard Open Data Portal template.
			          	<h4>Visualizations</h4>
			          	Visualizations help us better understand data. Create your own visualizations of our datasets or even mash up several datasets to see correlations.
			          	<h4>Apps</h4>
			          	We seek to make university data more accessible so that others can build tools to improve Harvard. Check out our datasets and build something of your own - we'd love to showcase your work.
			          	<h4>Comments</h4>
				        Comments - check our our <a href="https://github.com/Harvard-Open-Data-Project/hodp/issues">GitHub</a> and join the discussion with suggestions of improvement.
				      </p>
		            </Col>
		            <Col xs={12} sm={6}>
		              <h3>Build</h3>
		              <p> We're always seeking to improve the Harvard Open Data Portal. If you're interested in helping us build the web frontend for the data portal, email Neel Mehta at neelmehta@college.harvard.edu. </p>
		              <p> If you're at Harvard, let us know. We meet every Wednesday in Lamont B-30. Everyone is welcome, and we'd love to hear your input. </p>
		            </Col>
          		</Row>
			</div>
		);
	}
});

module.exports = GetInvolved;
