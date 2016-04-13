import React from 'react';
import {Panel, Button, Well, Jumbotron, Row, Col} from 'react-bootstrap';
import VisualizationContainer from '../components/VisualizationContainer.js';
import VisualizationData from '../data/Visualizations.js';
import DataverseWidget from'../components/DataverseWidget.js';

let Home = React.createClass({
  
  render: function() {
    let title = <h3>Featured datasets</h3>;
    return (
      <div>
        <Jumbotron>
            <h2>The Harvard Open Data Project is a student and faculty
          project to build Harvard's first open data portal.</h2>
          </Jumbotron>
          
          <Row>
            <Col xs={12} sm={6}>
              <h3>Mission Statement</h3>
              The goal of the Harvard Open Data Project (HODP) is to leverage open data to foster community, efficiency, and student innovation. Making data public and easily accessible allows us all to unlock its potential. Data-driven progress unites people, organizations, and departments as we all try to make daily life better. Aggregating, maintaining, and publicizing open data has and will continue to be a global trend and we want Harvard to be at its forefront. Our goal is to give that progress a home with centralization of available data, integration with existing systems, and showcases of data-inspired products.
            </Col>
            <Col xs={12} sm={6}>
              <h3>Learn more</h3>
              <p>Students from across the University are spearheading a project to build Harvard's 
              first open data portal, which will empower Harvard students and researchers to discover and hack with University
              data like financial data, enrollment stats, course catalogs, and more.</p>
              
              <p>Join us to make more university data accessible, build a web frontend for the data portal, and create interesting visualizations and apps using our data.
              It's a great opportunity to expand your skill set while building an enduring platform for the Harvard community.
    
              Interested in getting involved? <a href="https://github.com/Harvard-Open-Data-Project/hodp/issues">Join the discussion</a> or email neelmehta@college.harvard.edu.</p>
            </Col>
          </Row>
          
          { /* <DataverseWidget /> */ }
                    
          <Button block bsSize="large" bsStyle="primary" target="_blank" href="https://dataverse.harvard.edu/dataverse/harvardopendata">
            See all datasets
          </Button>

          <VisualizationContainer data={VisualizationData} />
          
          {/* Move into separate page  */}
            <h3>Getting started</h3>
          <p>
            Check out our <a target="_blank" href="https://github.com/Harvard-Open-Data-Project/hodp">GitHub repo</a>.
          </p>
          
          <h3>Comments?</h3>
          <p>
            We'd love to have your feedback/comments on our <a target="_blank" href="https://github.com/Harvard-Open-Data-Project/hodp/issues">GitHub Issues page</a>.
          </p>
          
          
      </div>
    );
  }
});

export default Home;
