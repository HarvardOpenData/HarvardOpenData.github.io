// script for the catalog
// $(document).ready(function(){

d3.csv("/assets/harvard-open-data-catalog.csv", function callback(data){
    console.log(data);

    // load entries into catalog
    var catalog = d3.select("#catalog-results")
        .selectAll("div.result")
        .data(data);

    catalog.exit().remove();

    // TODO use some kind of templating engine so generating this isn't as ugly
    catalog.enter().append("div")
        .attr("class", "result")
        .text(function(d){
            return d.title;
        });
});
