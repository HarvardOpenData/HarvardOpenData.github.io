import React from 'react';

/**
 * Attempts to load the Dataverse widget with our datasets. Not working as of 4/13/16.
 */
let DataverseWidget = React.createClass({
  componentDidMount: function() {
    // add script to document
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://dataverse.harvard.edu/resources/js/widgets.js?alias=harvardopendata&amp;dvUrl=https://dataverse.harvard.edu&amp;widget=iframe&amp;heightPx=500";
    console.log(script);
    document.getElementById("dataverse-widget").appendChild(script);
  },

  render: function() {
    return <div id="dataverse-widget">hi</div>
  }
});

export default DataverseWidget;