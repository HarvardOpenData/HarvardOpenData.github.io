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
    tagCounts = {};
    for(var i=0;i<data.length;i++) {
        var tags = data[i][5].toString().split(",");
        for(var j=0; j<tags.length; j++){
            if (!(tags[j] in tagCounts)){
                tagCounts[tags[j]]=0;
            }   
            tagCounts[tags[j]]++;
        }
    }
    var keys = Object.keys(tagCounts);
    var words=[];
    for (var i=0; i<keys.length;i++){
        words.push(

            {
                "text":keys[i], 
                "count":tagCounts[keys[i]],
            }
        )
    }
    console.log(words)
    var myConfig = {
        type: 'wordcloud',
        "options": {
        "words": words
        }
    };
    zingchart.render({ 
        id: 'myChart', 
        data: myConfig, 
        height: 400, 
        width: '100%' 
    });

}

handleClientLoad();