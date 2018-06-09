const CLIENT_ID = "523732880171-1fbi3ode503vnmnnbuuf8fno7hsn4qnn.apps.googleusercontent.com";
const API_KEY = "AIzaSyAoR6sZ_sfFZdSb46WuNX_pjnxp50x-1So";
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
var incidents = null;
var markers = [];
var markerClusterer = null;
var map = null;
var lastDate = null;

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}
function initClient(){
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
        }).then(function(){
        gapi.auth2.getAuthInstance();
        }).then(getSheetData);
}
// From: https://stackoverflow.com/questions/4933050/google-maps-infowindow-not-opening-on-click-event
// Adds an info window to a marker
function addInfoWindow(marker, content) {
    var infoWindow = new google.maps.InfoWindow({
        content: content
    });

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
    });
}

// Clears the map
function clearMap(){
    markers.forEach(function(marker){
        marker.setMap(null);
    });
    markers = [];
    if(markerClusterer){
        markerClusterer.setMap(null);
    }
}

// Populates the map with crime data from daysBack days before the last report date
// Negative values indicate to populate with all data
function populateMap(daysBack){
    clearMap(); 
    map = new google.maps.Map(document.getElementById("map"),{
        center: {lat: 42.374256, lng: -71.116293},
        zoom: 12
    });
    // Stores the last date for which crime data should be displayed
    var endDate = null;
    if(daysBack < 0){
        endDate = new Date(2018, 1, 1);
    }
    else{
        endDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
        endDate.setDate(endDate.getDate() - daysBack);
    }
    // Go through and associate crime data with markers
    for (var i = 0; i < incidents.length && incidents[i][0].length > 0; i++){
        var incident = incidents[i];
        var dateStrs = incident[0].split("-");
        var date = new Date(parseInt(dateStrs[2]), parseInt(dateStrs[0]) - 1, parseInt(dateStrs[1]));
        if(date <= endDate){
            break;
        }
        var time = incident[2];
        var marker = new google.maps.Marker({
            position: {lat: parseFloat(incident[8]), lng: parseFloat(incident[9])}
        });
        addInfoWindow(marker, date.toLocaleDateString("en-US") + "<br/>" + 
        time + "<br/>" + incident[3]);
        markers.push(marker);
    }
    
    markerCluster = new MarkerClusterer(map, markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}

// Function to pass into success handler for google scripts run
function onLoaded(response){
    incidents = response.result.values;
    var lastDateStrs = incidents[0][0].split("-");
    lastDate = new Date(parseInt(lastDateStrs[2]), parseInt(lastDateStrs[0]) - 1, parseInt(lastDateStrs[1]));
    // Make hidden elements visible
    document.getElementById("lblLastReport").innerHTML = "Last Report: " + lastDate.toLocaleDateString("en-US");
    document.querySelectorAll(".UserOptions").forEach(function(elt){
        elt.style.display = "block";
    });
    document.getElementsByTagName("BODY")[0].style.height = "100%";
    document.getElementById("main-container").style.marginBottom = (document.getElementsByClassName("footer")[0].clientHeight + 80).toString() + "px";
    console.log(document.getElementsByClassName("footer")[0].clientHeight.toString());
    // By default populate map with all time data
    populateMap(-1);
}

// Load the data from the google sheet
function getSheetData(){
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1AMbEglG18BDz4-mQgTfAl4-jiT2Th_tKyIjwBEMDWF8',
        range: 'Logs!A2:J',
    }).then(onLoaded);
}
handleClientLoad();