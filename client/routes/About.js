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
		            </Col>
		            <Col xs={12} sm={6}>
		            </Col>
          		</Row>
			</div>
		);
	}
});

module.exports = About;
