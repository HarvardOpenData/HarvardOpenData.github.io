var xKey;
var yKeys = [];

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
    yKeys.forEach(function(key){
        
        datasets.push(
            {
                label : key,
                data : getOfKey(data, key).map(function(elt){
                    return parseFloat(elt)
                }),
                fill : false
            }
        )
    });
    console.log(datasets);
    var labels = getOfKey(data, xKey);
    labels.reverse();
    var config = {
        type : "line",
        data : {
            labels : labels, 
            datasets : datasets,
        },
        options : {
            responsive : false
        }
    }
    console.log(config);

    var chart = new Chart(context, config);
}

window.onload = function(){
    loadData("/assets/dataviz/faculty_race.csv");
}