// script for the catalog
// $(document).ready(function(){

d3.csv("/assets/harvard-open-data-catalog.csv", function callback(data){
    console.log(data);

    // sort data by title
    data.sort(function(a, b) {
        return a.title > b.title;
    });

    // load entries into catalog
    var catalog = d3.select("#catalog-results")
        .selectAll("div.result")
        .data(data);

    catalog.exit().remove();

    // TODO use some kind of templating engine so generating this isn't as ugly
    var catalogEnter = catalog.enter();
    var catalogDiv = catalogEnter.append("div")
        .attr("class", "result panel panel-default");

    // add heading
    catalogDiv.append("div")
        .attr("class", "panel-heading")
        .append("h3")
            .attr("class", "panel-title")
            .text(function(d){
                return d.title;
            });

    // add body
    var catalogBody = catalogDiv.append("div")
        .attr("class", "panel-body");

    // text description
    catalogBody.append("p")
        .text(function(d){
            return d.description + "  ";
        })
        .append("span")
            .attr("class", "label label-info")
            .text(function(d) {
                return d.type;
            })

    // download button
    catalogBody.append("a")
        .attr("href", function(d) {
            return d.url;
        })
        .attr("class", "btn btn-primary")
        .text(function(d){
            return "Download"
        });

});
