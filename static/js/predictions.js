// Number of questions
var numQuestions = 5;

// Create and update labels for each question
function createLabels(slider, forecastElement, outcomeZeroElement, outcomeOneElement) {

    function updateLabels() {
        // Display the current prediction
        var prediction = parseInt(slider.value);
        document.getElementById(forecastElement).innerHTML = prediction.toString() + "%";

        // Calculate points for each outcome
        var pointsIfOne = calculatePoints(prediction, 100);
        var pointsIfZero = calculatePoints(prediction, 0);
        document.getElementById(outcomeOneElement).innerHTML = getVerb(pointsIfOne) + Math.abs(pointsIfOne).toString();
        document.getElementById(outcomeZeroElement).innerHTML = getVerb(pointsIfZero) + Math.abs(pointsIfZero).toString();
    }

    updateLabels();

    slider.oninput = function() {
        updateLabels();
    }

}

// Run FiveThirtyEight's version of the Brier scoring function
function calculatePoints(prediction, outcome) {
    var diff = (prediction - outcome) / 100;
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

// Set up sliders
for (i = 1; i < numQuestions + 1; i++) {
    sliderID = "q" + i.toString() + "-slider"
    forecastElement = "q" + i.toString() + "-slider-value";
    outcomeZeroElement = "q" + i.toString() + "-0-point-change";
    outcomeOneElement = "q" + i.toString() + "-1-point-change";
    var slider = document.getElementById(sliderID)
    createLabels(slider, forecastElement, outcomeZeroElement, outcomeOneElement)
}
