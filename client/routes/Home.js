import React from 'react';
import {Panel, Button} from 'react-bootstrap';

var Home = React.createClass({
  render: function() {
    let title = <h3>Featured datasets</h3>;
    return (
      <div>
        <p className="lead">The Harvard Open Data Project is a student and faculty
          project to build Harvard's first open data portal.</p>
          
          
          <p>Students from across the University are spearheading a project to build Harvard's 
          first open data portal, which will empower Harvard students and researchers to discover and hack with University
          data like financial data, enrollment stats, course catalogs, and more.</p>
          
          <p>Join us to make more university data accessible, build a web frontend for the data portal, and create interesting visualizations and apps using our data.
          It's a great opportunity to expand your skill set while building an enduring platform for the Harvard community.

          Interested in getting involved? Join the discussion on the Issues tab or email neelmehta@college.harvard.edu.</p>
          
          <h3>Getting started</h3>
          <p>
            Check out our <a href="https://github.com/Harvard-Open-Data-Project/hodp">GitHub repo</a>.
          </p>
          
          
          <Panel header={title}>
            <Button bsStyle="primary" href="http://static.fas.harvard.edu/registrar/reports/statistics/Course_Enrollment_Statistics.xlsx">
              Course Enrollment
            </Button>
            
            <Button bsStyle="link" target="_blank" href="https://dataverse.harvard.edu/dataverse/harvardopendata">
              See all datasets
            </Button>
          </Panel>
        
      </div>
    );
  }
});

module.exports = Home;
