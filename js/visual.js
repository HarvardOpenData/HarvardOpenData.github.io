var xKey;
var yKeys = [];
var xLabel;
var yLabel;
var chartType;

const lineColors = [
    "#EC7063",
    "#85C1E9",
    "#58D68D",
    "#F8C471",
    "#BB8FCE",
    "#F7DC6F"
]

function getOfKey (data, key){
    var result = [];
    data.forEach(function (elt){
        if(elt[key]){
            result.push(elt[key]);
        }
    });
    return result;
}
function loadData (file) {
    d3.csv(file, function(data){
        var keys = Object.keys(data[0]);
        xKey = keys[0];
        for (var i = 1; i < keys.length; i++){
            yKeys.push(keys[i]);
        }
        populateChart(data);
    });
}

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

    var chart = new Chart(context, config);
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