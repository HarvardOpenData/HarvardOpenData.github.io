const CLIENT_ID = "523732880171-1fbi3ode503vnmnnbuuf8fno7hsn4qnn.apps.googleusercontent.com";
const API_KEY = "AIzaSyAoR6sZ_sfFZdSb46WuNX_pjnxp50x-1So";
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
// var incidents = null;
// var markers = [];
// var markerClusterer = null;
// var map = null;
// var lastDate = null;

var type_filter = "All"
var start_filter = "All"

const map_url_1 = "//snippets.mapmycdn.com/routes/view/embedded/"
const map_url_2 = "?width=600&height=400&elevation=true&info=true&line_color=E60f0bdb&rgbhex=DB0B0E&distance_markers=0&unit_type=imperial&map_mode=ROADMAP&last_updated=2018-08-12T08:28:31-04:00"

var start_locs = new Set(["All"])
var fullData;
var selected_route;

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
        spreadsheetId: '1iv8yoSoFcgJ0nzhF17KMkopQ7cGrnVO_WAvarVL1Zuc',
        range: 'routes!A2:F',
    }).then(data => (onLoaded(data.result.values)));
}

// Function to pass into success handler for google scripts run
function onLoaded(data){
	data.forEach(function(row){
		start_locs.add(row[5])
		if(row[0].length > 120){
			row[0] = row[0].slice(0,117) + "..."
		}
	})
	start_locs = Array.from(start_locs).sort()
	var selector = document.getElementById('startSelect')
	start_locs.forEach(function(loc){
		var option = document.createElement('option')
		option.value = loc
		var option_text = document.createTextNode(loc)
		option.appendChild(option_text)
		selector.appendChild(option)
	})
	fullData = data
	createTable(fullData);
}

function createTable(tableData) {
	//create table by appending each row as necesssary
	var table = document.getElementById('itemsTable');
	// table.innerHTML = "";
	var tableBody = document.getElementById('tableBody');
	tableBody.innerHTML = ""
	console.log(tableData)

	tableData.forEach(function(rowData) {
		if((type_filter == "All" || rowData[2] == type_filter) && (start_filter == "All" || rowData[5] == start_filter)){
			var row = document.createElement('tr');
			var new_data = rowData.slice(0, -3)
			new_data.forEach(function(cellData, index) {
					var cell = document.createElement('td');
					var text = document.createTextNode(cellData)
					if(index == 0){
						var a = document.createElement('a')
						a.onclick = function(){
							updateFilter('current_route', rowData[4])
							document.getElementById('mapmyfitness_route').src =  map_url_1 + rowData[4] + map_url_2
							$('#runModal').modal('show')
							var title = document.getElementById('modalTitle')
							title.innerHTML = ""
							title.appendChild(document.createTextNode(rowData[0]))
						}
						// a.href = rowData[3]
						
						a.title = cellData
						a.appendChild(text)
						cell.appendChild(a)
					}else{
						cell.appendChild(text);
					}
					row.appendChild(cell);
			});
			tableBody.appendChild(row);
		}else{
			console.log(type_filter, rowData[2])
		}
	});
	table.appendChild(tableBody);
}

function updateFilter(field, val){
	console.log(val)
	if(field == "type"){
		type_filter = val;
	}else if(field == "start"){
		start_filter = val
	}else if(field == "route"){
		selected_route = val
	}
	console.log(type_filter, start_filter)
	createTable(fullData)
}

handleClientLoad();