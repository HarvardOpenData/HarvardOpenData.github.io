import React from 'react';
import {Panel, Button} from 'react-bootstrap';

let VisualizationPanel = React.createClass({
	render: function() {
	    let data = this.props.data;
	    let title = <h3>{data.title}</h3>;
	    let dsource = data.source ? (<Button className="pull-right" bsSize="small" bsStyle="primary" target="_blank" href={data.source}>
				Data source
			</Button>) : null;
	    	
		return (
			<Panel header={title}>
				<a href={data.img} target="_blank"><img src={data.img} className="img img-responsive text-center" /></a>
				<p>{data.text}</p>
				{dsource}
			</Panel>
		);
	}
});

export default VisualizationPanel;
