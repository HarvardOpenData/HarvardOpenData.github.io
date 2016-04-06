import React from 'react';
import {Panel, Button, Row, Col} from 'react-bootstrap';

let VisualizationPanel = React.createClass({
	render: function() {
	    let data = this.props.data;
	    let title = <h3>{data.title}</h3>;
	    let dsource = data.source ? (<Button className="pull-right" bsSize="small" bsStyle="primary" target="_blank" href={data.source}>
				Data source
			</Button>) : null;
	    	
		return (
			<Panel header={title}>
				<Row>
					<Col sm={6}>
						<a href={data.img} target="_blank"><img src={data.img} className="img img-responsive text-center" /></a>
					</Col>
					<Col sm={6}>
						<p className="lead">{data.text}</p>
						{dsource}
					</Col>
				</Row>
			</Panel>
		);
	}
});

export default VisualizationPanel;
