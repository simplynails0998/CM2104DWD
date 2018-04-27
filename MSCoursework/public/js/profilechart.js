
// public/js/profilechart.js

// JS to draw Google Chart for user progress on profile page


// get number of 'bagged' munros from html element
var numBagged = document.getElementById('progress-text').dataset.testValue;
numBagged = parseInt(numBagged);

// determine number of remaining munros
var remaining = 282 - numBagged;

// GOOGLE CHART
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

// draw chart
function drawChart() {

    // set up sections using number of bagged and remaining munros
    var data = google.visualization.arrayToDataTable([
        ['Category','Number of Munros'],
        ['Bagged',numBagged],
        ['Remaining',remaining]
    ]);

    // chart options
    var options = {
        pieHole: 0.4, // size of hole in donut chart
        slices: {
            0: {color: '#3B8686',offset: 0.2}, // make 'bagged' slice pop out from chart
            1: {color: '#79BD9A'}
        },
        pieSliceText: 'none',
        legend: 'none'
    };

    // draw chart on html
    var chart = new google.visualization.PieChart(document.getElementById('progress-donut'));
    chart.draw(data, options);

}