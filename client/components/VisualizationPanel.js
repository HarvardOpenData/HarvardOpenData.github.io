import React from 'react';
import {Panel, Button} from 'react-bootstrap';

let VisualizationPanel = React.createClass({
	render: function() {
	    let data = this.props.data;
	    let title = <h3>{data.title}</h3>;
		return (
			<Panel header={title}>
				<img src={data.img} className="img img-responsive text-center" />
				<p>{data.text}</p>
				<Button bsStyle="primary" target="_blank" href={data.source}> View Source </Button>
			</Panel>
		);
	}
});

export default VisualizationPanel;
