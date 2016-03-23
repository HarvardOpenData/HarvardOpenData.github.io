import React from 'react';
import {Row, Col} from 'react-bootstrap';
import VisualizationPanel from './VisualizationPanel.js';

let VisualizationContainer = React.createClass({
    render: function() {
        let vizData = this.props.data;
        let visualizationPanels = vizData.map(data => 
            <Col sm={6}>
                <VisualizationPanel data={data} />
            </Col>
        );
        return (
            <Row>
                {visualizationPanels}
            </Row>
        );
    }
});

export default VisualizationContainer;