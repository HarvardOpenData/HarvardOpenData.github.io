var width = 400;
var height = 300;

var y = d3.scaleLinear()
    .range([height, 0]);

var x = d3.scaleLinear()
    .range([0, width]);

var chart = d3.select("#tuition")
    .attr("width", width)
    .attr("height", height);


d3.csv("charts/tuition.csv", type, function(error, data) {
    
    y.domain([0, d3.max(data, function(d) { return d.total; })]);

    x.domain(d3.extent(data, function(d) { return d.academicYear; }));

	/*chart.append("g")
	    .attr("transform", "translate(0," + (height) + ")")
	    .attr("class", "axis")
	    .call(d3.axisBottom(x));

	chart.append("g")
		.attr("class", "axis")
		.call(d3.axisLeft(y));*/

    barWidth = width / data.length;

    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + (width - i * barWidth) + ",0)"; });

    //tuition
    bar.append("rect")
        .attr("width", barWidth - 1)
        .attr("y", function(d) { return y(d.tuition); })
        .attr("height", function(d) { return height - y(d.tuition); })
        .attr("class", "tuitionbar");

    //room
    bar.append("rect")
        .attr("width", barWidth - 1)
        .attr("y", function(d) { return y(d.tuition + d.room) })
        .attr("height", function(d) { return height - y(d.room); })
        .attr("class", "roombar");

    //board
    bar.append("rect")
        .attr("width", barWidth - 1)
        .attr("y", function(d) { return y(d.tuition + d.room + d.board) })
        .attr("height", function(d) { return height - y(d.board); })
        .attr("class", "boardbar");

    //health services fee
    bar.append("rect")
        .attr("width", barWidth - 1)
        .attr("y", function(d) { return y(d.tuition + d.room + d.board + d.healthServicesFee) })
        .attr("height", function(d) { return height - y(d.healthServicesFee); })
        .attr("class", "healthServicesFeebar");

    //student services fee
    bar.append("rect")
        .attr("width", barWidth - 1)
        .attr("y", function(d) { return y(d.tuition + d.room + d.board + d.healthServicesFee + d.studentServicesFee) })
        .attr("height", function(d) { return height - y(d.studentServicesFee); })
        .attr("class", "studentServicesFeebar");

    bar.append("text")
        .attr("x", barWidth / 2)
        .attr("y", function(d) { return y(d.total) + 3; })
        .attr("dy", ".75em")
        .text(function(d) { return d.total; });
});

function type(d) {
	d.total = d.total.replace(/\$/g,'');  //remove dollar sign
	d.total = d.total.replace(/\,/g,'');  //remove commas
	d.total = parseInt(d.total, 10);

	d.tuition = d.tuition.replace(/\$/g,'');  //remove dollar sign
	d.tuition = d.tuition.replace(/\,/g,'');  //remove commas
	d.tuition = parseInt(d.tuition, 10);

	d.healthServicesFee = d.healthServicesFee.replace(/\$/g,'');  //remove dollar sign
	d.healthServicesFee = d.healthServicesFee.replace(/\,/g,'');  //remove commas
	d.healthServicesFee = parseInt(d.healthServicesFee, 10);

	d.studentServicesFee = d.studentServicesFee.replace(/\$/g,'');  //remove dollar sign
	d.studentServicesFee = d.studentServicesFee.replace(/\,/g,'');  //remove commas
	d.studentServicesFee = parseInt(d.studentServicesFee, 10);

	d.room = d.room.replace(/\$/g,'');  //remove dollar sign
	d.room = d.room.replace(/\,/g,'');  //remove commas
	d.room = parseInt(d.room, 10);

	d.board = d.board.replace(/\$/g,'');  //remove dollar sign
	d.board = d.board.replace(/\,/g,'');  //remove commas
	d.board = parseInt(d.board, 10);

	return d
}