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

// Load the data from the google sheet
function getSheetData(){
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1gWAZjMHv9WCE-zqvuTcO9akwbGjgPpeRj0XlibspTs0',
        range: 'Aggregator!A2:G',
    }).then(data => (onLoaded(data.result.values)));
}

// Function to pass into success handler for google scripts run
function onLoaded(data){
    console.log(data);
}

handleClientLoad();