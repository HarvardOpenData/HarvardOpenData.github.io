var barChartData = {
    labels: [
        "Climate Change",
        "Immigration",
        "Economy",
        "Health Care",
        "Income Inequality",
        "Social Justice",
        "Gun Policy",
        "Criminal Justice Reform"
    ],
    datasets: [
        {
            label: "Students",
            backgroundColor: "lightblue",
            borderColor: "blue",
            borderWidth: 1,
            data: [27, 12, 12, 18, 10, 10, 7, 2, 2]
        },
        {
            label: "Elizabeth Warren",
            backgroundColor: "pink",
            borderColor: "red",
            borderWidth: 1,
            data: [11, 1, 16, 22, 17, 25, 3, 0, 5]
        }
    ]
};


var chartOptions = {
    maintainAspectRatio: false,

    responsive: true,
    legend: {
        position: "top"
    },
    title: {
        display: true,
        text: "Comparison of the Attitudes of Harvard College Students vs Democratic Candidates"
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

var ctx = document.getElementById("canvas").getContext("2d");
var chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: [
            "Climate Change",
            "Immigration",
            "Economy",
            "Health Care",
            "Income Inequality",
            "Social Justice",
            "Gun Policy",
            "Criminal Justice Reform"
        ],
        datasets: [
            {
                label: "Students",
                backgroundColor: "lightblue",
                borderColor: "blue",
                borderWidth: 1,
                data: [27, 12, 12, 18, 10, 10, 7, 2, 2]
            },
            {
                label: "Elizabeth Warren",
                backgroundColor: "pink",
                borderColor: "red",
                borderWidth: 1,
                data: [11, 1, 16, 22, 17, 25, 3, 0, 5]
            }
        ]
    },
    options: chartOptions
});

chart.canvas.parentNode.style.height = '400px';
chart.canvas.parentNode.style.width = '500px';




function updateChart() {
    var x = document.getElementById("mySelect").selectedIndex;
    candidate = (document.getElementsByTagName("option")[x].value);
    console.log(candidate);
    if (candidate == "Joe Biden") {
        chart.data.datasets[1].data = [37,2,5,10,21,19,3,0,1];
        chart.data.datasets[1].label = "Joe Biden"
        chart.update();
    }
    if (candidate == "Elizabeth Warren") {
        chart.data.datasets[1].data = [11, 1, 16, 22, 17, 25, 3, 0, 5];
        chart.data.datasets[1].label = "Elizabeth Warren"
        chart.update();
    }
    if (candidate == "Bernie Sanders") {
        chart.data.datasets[1].data = [6,9,24,12,24,13,0,3,8];
        chart.data.datasets[1].label = "Bernie Sanders"
        chart.update();
    }
    if (candidate == "Kamala Harris") {
        chart.data.datasets[1].data = [3,7,10,21,15,30,10,5,0];
        chart.data.datasets[1].label = "Kamala Harris"
        chart.update();
    }
    if (candidate == "Andrew Yang") {
        chart.data.datasets[1].data = [5,0,17,12,35,14,1,2,4];
        chart.data.datasets[1].label = "Andrew Yang"
        chart.update();
    }
    if (candidate == "John Delaney") {
        chart.data.datasets[1].data = [9, 2, 24, 42, 8, 11, 2, 0,2];
        chart.data.datasets[1].label = "John Delaney"
        chart.update();
    }
    if (candidate == "Marriane Williamson") {
        chart.data.datasets[1].data = [7,3,14,19,5,22,3,5,19];
        chart.data.datasets[1].label = "Marriane Williamson"
        chart.update();
    }
    if (candidate == "Tulsi Gabbard") {
        chart.data.datasets[1].data = [6,0,4,6,0,14,0,2,70];
        chart.data.datasets[1].label = "Tulsi Gabbard"
        chart.update();
    }
    if (candidate == "Julián Castro") {
        chart.data.datasets[1].data = [9,22,5,15,4,12,1,25,1];
        chart.data.datasets[1].label = "Julián Castro"
        chart.update();
    }
    if (candidate == "Corey Booker") {
        chart.data.datasets[1].data = [2,5,3,27,9,22, 31,1];
        chart.data.datasets[1].label = "Corey Booker"
        chart.update();
    }
}

var ctx1 = document.getElementById("canvas1").getContext("2d");
var stackedBar = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Red'],
        datasets: [
            {
                label: 'Elizabeth Warren',
                data: [42],
                backgroundColor: '#D6E9C6' // green
            },
            {
                label: 'Joe Biden',
                data: [24],
                backgroundColor: '#FAEBCC' // yellow
            },
            {
                label: 'Bernie Sanders',
                data: [14],
                backgroundColor: '#EBCCD1' // red
            },
            {
                label: 'Kamala Harris',
                data: [9],
                backgroundColor: '#bfe4e9' // green
            },
            {
                label: 'Andrew Yang',
                data: [8],
                backgroundColor: '#facfe3' // yellow
            },
            {
                label: 'John Delaney',
                data: [2],
                backgroundColor: '#ebe3a4' // red
            },
            {
                label: 'Marriane Williamson',
                data: [0],
                backgroundColor: '#65e9a7' // green
            },
            {
                label: 'Tulsi Gabbard',
                data: [1],
                backgroundColor: '#f1defa' // yellow
            },
            {
                label: 'Julián Castro',
                data: [0],
                backgroundColor: '#ebd7c9' // red
            },
            {

                data: [0],
                backgroundColor: '#eaebcf' // red
            }
        ]
    },
    options: {
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
});
stackedBar.canvas.parentNode.style.height = '500px';
stackedBar.canvas.parentNode.style.width = '150px';