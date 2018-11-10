const CLIENT_ID = "523732880171-1fbi3ode503vnmnnbuuf8fno7hsn4qnn.apps.googleusercontent.com";
const API_KEY = "AIzaSyAoR6sZ_sfFZdSb46WuNX_pjnxp50x-1So";
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
var incidents = null;
var markers = [];
var markerClusterer = null;
var map = null;
var lastDate = null;

var fullData;

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
        spreadsheetId: '1S3vFDul1PeB84Zd8G5ewe1ocZ6ezidQzAp5gn1eiHtQ',
        range: 'Data!A2:C',
    }).then(data => (onLoaded(data.result.values)));
}

// Function to pass into success handler for google scripts run
function onLoaded(data){
	fullData = data;
	fullData.reverse();
	var date= document.getElementById("date");
	date.value = today();
	loadDoc();
}

function createTable(tableData) {
	var table = document.getElementById('itemsTable');
	table.innerHTML = "";
	var tableBody = document.createElement('tbody');

	tableData.forEach(function(rowData) {
		var row = document.createElement('tr');
		rowData.forEach(function(cellData) {
			var cell = document.createElement('td');
			cell.appendChild(document.createTextNode(cellData));
			row.appendChild(cell);
		});
		tableBody.appendChild(row);
	});
	table.appendChild(tableBody);
}

function loadDoc(mealType = "") {
	var date= document.getElementById("date").value;
	var date = convertMMDDYYYY(date);
	console.log(mealType);
	var dayData = []
	for (var i = 0; i < fullData.length; i++) {
		if (fullData[i][0] == date && fullData[i][1] == mealType) {
			dayData.push(fullData[i].slice(2));
		}
	}
	console.log(dayData);
	createTable(dayData);
}

function convertMMDDYYYY(date) {
	var year = date.substring(0, 4);
	var month_day = date.substring(5, 10);
	return month_day + "-" + year;
}

function today() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
		dd = '0'+dd
	} 

	if(mm<10) {
		mm = '0'+mm
	} 

	today = yyyy + '-' + mm + '-' + dd;
	return today;
}


handleClientLoad();