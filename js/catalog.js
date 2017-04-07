// script for the catalog
// $(document).ready(function(){

var catalogData;

d3.csv("/assets/harvard-open-data-catalog.csv", function callback(data){
    // sort data by title
    data.sort(function(a, b) {
        return a.title > b.title;
    });

    // update global var storing this info
    catalogData = data;

    // update counter
    // UPDATE: nah, this makes the page update weirdly as soon as the CSV is loaded.
    //  hurts UX, so don't bother for now
    // $('#catalog-count').html(data.length);

    // update display
    updateCatalog(catalogData);

    // if there's a search query, go for it
    var searchQuery = getURLParameter("q");
    if (searchQuery) {
        // run search
        searchCatalog({
            text: searchQuery
        }, catalogData);

        // put into search bar
        $('#catalog-search-text').val(searchQuery);
    }
});

// catch submitting the search form
// $('#catalog-search-form').on('submit', function(){
//     var searchQueryText = $('#catalog-search-text').val();
//
//     var query = {
//         text: searchQueryText
//     };
//
//     // execute search
//     searchCatalog(query, catalogData);
//
//     return false;
// });

// auto-search when someone types
// FIXME: doesn't work on IE8 and below :(
var searchFunction = function(){
    var searchQueryText = $('#catalog-search-text').val();

    var query = {
        text: searchQueryText
    };

    // execute search
    searchCatalog(query, catalogData);
};
// throttle searching b/c people type faster than we can respond
var throttledSearch = _.throttle(searchFunction, 100);
$('#catalog-search-text').on('input propertychange', throttledSearch);

/**
 * Searches the data catalog based on specified fields.
 * @param  {Object} query   contains criteria that are AND'ed together:
 *                              `text`: whether the title/description contain a string
 *                              `type`: whether the type matches the given string
 * @param {Object[]} allData    an array of all datasets you want to search over
 * @return {Object[]}       an array of datasets to show
 */
function searchCatalog(query, allData) {
    // if no query, just return everything
    if (!query) {
        return allData;
    }

    var displayData = allData.filter(function(d) {
        // basically, exclude a dataset if it fails any of our criteria
        // anything that doesn't fail gets passed
        // this way, we can AND together all our criteria

        // search on text (contains)
        if (query.text) {
            query.text = query.text.toLowerCase();
            if (d.title.toLowerCase().indexOf(query.text) < 0
                && d.description.toLowerCase().indexOf(query.text) < 0) {
                    return false;
            }
        }

        // search on type (exact match())
        if (query.type && d.type !== query.type) {
            return false;
        }

        return true;
    });

    updateCatalog(displayData);
}


/**
 * Updates the data catalog results to show the given datasets.
 */
function updateCatalog(displayData) {
    // load entries into catalog
    var catalog = d3.select("#catalog-results")
        .selectAll("div.result")
        .data(displayData, function key(d) {
            return d.title;
        });


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
            return d.description;
        })

    // download button
    catalogBody.append("a")
        .attr("href", function(d) {
            return d.url;
        })
        .attr("class", "btn btn-primary")
        .text(function(d){
            var downloadString = "Download";
            return d.type ? (downloadString + " (" + d.type + ")") : downloadString;
        });

    // label with type
    // catalogBody.append("span")
    //     .attr("class", "text text-muted ")
    //     .text(function(d) {
    //         return "  " + d.type;
    //     });

}


// Get query-string parameters
// http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript/11582513#11582513
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
