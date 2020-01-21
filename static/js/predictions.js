function createLabels(slider, forecastElement, outcomeZeroElement, outcomeOneElement) {

    function updateLabels() {
        // Display the current prediction
        var prediction = parseInt(slider.value);
        document.getElementById(forecastElement).innerHTML = prediction.toString() + "%"

        // Calculate points for each outcome
        var pointsIfOne = calculatePoints(prediction, 100)
        var pointsIfZero = calculatePoints(prediction, 0)
        document.getElementById(outcomeOneElement).innerHTML = getVerb(pointsIfOne) + Math.abs(pointsIfOne).toString()
        document.getElementById(outcomeZeroElement).innerHTML = getVerb(pointsIfZero) + Math.abs(pointsIfZero).toString()
    }

    updateLabels()

    slider.oninput = function() {
        updateLabels()
    }

}

// Run FiveThirtyEight's version of the Brier scoring function
function calculatePoints(prediction, outcome) {
    var diff = (prediction - outcome) / 100
    var brierScore = Math.pow(diff, 2)
    var adjustedScore = -(brierScore - 0.25) * 200
    return adjustedScore.toFixed(1);
}

function getVerb(points) {
    if (points >= 0) {
        return "gain "
    } else {
        return "lose "
    }
}

// Create sliders
var slider1 = document.getElementById('q1-slider');
var slider2 = document.getElementById('q2-slider');
var slider3 = document.getElementById('q3-slider');
var slider4 = document.getElementById('q4-slider');

// Create labels for each slider
createLabels(slider1, "q1-slider-value", "q1-0-point-change", "q1-1-point-change")
createLabels(slider2, "q2-slider-value", "q2-0-point-change", "q2-1-point-change")
createLabels(slider3, "q3-slider-value", "q3-0-point-change", "q3-1-point-change")
createLabels(slider4, "q4-slider-value", "q4-0-point-change", "q4-1-point-change")
