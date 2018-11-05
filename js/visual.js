<src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js">
<src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.1.2/papaparse.js">

var xKey;
var yKeys = [];
var xLabel;
var yLabel;
var chartType;

// Colors for the graph lines. Need to add more when possible
const lineColors = [
    "#EC7063",
    "#85C1E9",
    "#58D68D",
    "#F8C471",
    "#BB8FCE",
    "#F7DC6F"
]

/** 
 * Returns values of given key in object array
 * @param {Object[]} data   Array of objects to search
 * @param {string} key      Key to get the values of
*/
function getOfKey (data, key){
    var result = [];
    data.forEach(function (elt){
        if(elt[key]){
            result.push(elt[key]);
        }
    });

    data.grep
    return result;
}

// Loads the data from the csv file and calls populate chart
function loadData (file) {
    d3.csv(file, function(data){
        var keys = Object.keys(data[0]);
        xKey = keys[0];
        for (var i = 1; i < keys.length; i++){
            yKeys.push(keys[i]);
        }
        populateChart(data);
        populateTable(data);
    });
}

// Populate a table in html with data

function arrayToTable(tableData) {
    var table = $('<table></table>');
    $(tableData).each(function (i, rowData) {
        var row = $('<tr></tr>');
        $(rowData).each(function (j, cellData) {
            row.append($('<td>'+cellData+'</td>'));
        });
        table.append(row);
    });
    return table;
}

$.ajax({
    type: "GET",
    url: "http://localhost/test/data.csv",
    success: function (data) {
        $('body').append(arrayToTable(Papa.parse(data).data));
    }
});

// Populates the chart with data
function populateChart(data){
    var context = document.getElementById("chartViz").getContext("2d");
    var datasets = [];
    yKeys.forEach(function(key, index){
        datasets.push(
            {
                label : key,
                data : getOfKey(data, key).map(function(elt){
                    return parseFloat(elt)
                }),
                backgroundColor: lineColors[index % lineColors.length],
                borderColor : lineColors[index % lineColors.length],
                fill : false
            }
        )
    });
    var labels = getOfKey(data, xKey);
    labels.reverse();
    var config = {
        type : chartType,
        data : {
            labels : labels, 
            datasets : datasets,
        },
        options : {
            responsive : false,
            scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: yLabel
                  }
                }],
                xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: xLabel
                    }
                  }]
              } 
        }
    }

    var chart = new Chart(context, config) {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    ;

}

window.onload = function(){
    var id = getURLParameter("id");
    var title = document.getElementById("title");
    var desc = document.getElementById("desc");
    var source = document.getElementById("source");
    if (id){
        d3.json("/assets/visualizations.json", function (data){
            console.log(data);
            console.log(data[id].file);
            title.innerHTML = data[id].title;
            desc.innerHTML = data[id].description ? data[id].description : "";
            source.innerHTML = data[id].source ? "Source: " + data[id].source : "";
            chartType = data[id].type;
            xLabel = data[id].xaxis;
            yLabel = data[id].yaxis;
            loadData("/assets/dataviz/" + data[id].file);
        });
    }
    else{ 
        title.innerHTML = "Invalid URL";
    }
}