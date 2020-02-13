// Update labels for each question based on slider value
function updateLabels(sliderValue, forecastElement, outcomeZeroElement, outcomeOneElement) {
    // Display the current prediction
    var prediction = parseInt(sliderValue);
    document.getElementById(forecastElement).innerHTML = prediction.toString() + "%";
    // Calculate points for each outcome
    var pointsIfOne = calculatePoints(prediction, 1);
    var pointsIfZero = calculatePoints(prediction, 0);
    document.getElementById(outcomeOneElement).innerHTML = getVerb(pointsIfOne) + Math.abs(pointsIfOne).toString();
    document.getElementById(outcomeZeroElement).innerHTML = getVerb(pointsIfZero) + Math.abs(pointsIfZero).toString();
}

// Run FiveThirtyEight's version of the Brier scoring function
function calculatePoints(prediction, outcome) {
    var diff = (prediction / 100) - outcome;
    var brierScore = Math.pow(diff, 2);
    var adjustedScore = -(brierScore - 0.25) * 200;
    return adjustedScore.toFixed(1);
}

function getVerb(points) {
    if (points >= 0) {
        return "gain ";
    } else {
        return "lose ";
    }
}

// Update labels showing slider value and points earned when the page is loaded
var sliders = document.getElementsByClassName("slider")
for (i = 0; i < sliders.length; i++) {
    slider = sliders[i];
    forecastElement = slider.id + "-value";
    outcomeZeroElement = slider.id + "-0-points";
    outcomeOneElement = slider.id + "-1-points";
    updateLabels(slider.value, forecastElement, outcomeZeroElement, outcomeOneElement);
}

// Set up collapsible sections
var collapsibleButtons = document.getElementsByClassName("collapsible");

for (i = 0; i < collapsibleButtons.length; i++) {
    collapsibleButtons[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
    });
}

// Set default text for collapsible sections if they have no content
var committedPredictions = document.getElementsByClassName("past-deadline")
if (committedPredictions.length == 0) {
    document.getElementById("prediction-reports").innerHTML = "<p>Nothing yet. Past predictions will show up here when their deadlines pass, but the outcomes haven't been observed.</p>"
}

var crystallizedPredictions = document.getElementsByClassName("realized")
if (crystallizedPredictions.length == 0) {
    document.getElementById("prediction-results").innerHTML = "<p>Nothing yet. Results will show up here when you make a prediction and the outcome is observed!</p>"
}

var leaderboard = document.getElementsByClassName("leaderboard-users")
if (leaderboard.length == 0) {
    document.getElementById("leaderboard-results").innerHTML = "<p>Coming soon!</p>"
}

