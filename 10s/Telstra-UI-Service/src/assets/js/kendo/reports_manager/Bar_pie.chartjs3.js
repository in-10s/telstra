"use strict";
$(document).ready(function() {
/*******************************
CHART.JS
*******************************/
    //RANDOM MATH
    var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
	
    
/*******************************
BAR CHART
*******************************/
    var barChartData = {
	labels : ["Jan 2015","Feb 2015","Mar 2015","Apr 2015","May 2015","Jun 2015","Jul 2015"],
	
	//var barChartData = [{data: [[0,1]], color: "red"}, {data: [[1,2]], color: "yellow"}, {data: [[2,3]], color: "green"}];
	
	datasets : [	  
	    {
		firstColor : "red",
		fillColor : "rgba(97,175,222,0.6)",
		strokeColor : "rgba(54,54,54,0.1)",
		highlightFill : "rgba(54,54,54,0.3)",
		highlightStroke : "rgba(54,54,54,0.2)",
		data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
	    }
	]
    }
	
	/*******************************
LINE CHART
*******************************/
    var lineChartData = {
	labels : ["Jan 2015","Feb 2015","Mar 2015","Apr 2015","May 2015","Jun 2015","Jul 2015"],
	datasets : [
	    {
		label: "My First dataset",
    
		fillColor : "rgba(54,54,54,0.1)",
		strokeColor : "rgba(54,54,54,0.1)",
		pointColor : "rgba(54,54,54,0.1)",
		pointHighlightFill : "rgba(54,54,54,0.9)",
		pointHighlightStroke : "rgba(54,54,54,0.1)",
		data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
	    },
	    {
		label: "My Second dataset",
		fillColor : "rgba(131,191,23,0.4)",
		strokeColor : "rgba(131,191,23,0.1)",
		pointColor : "rgba(131,191,23,0.1)",
		pointHighlightFill : "rgba(131,191,23,0.9)",
		pointHighlightStroke : "rgba(131,191,23,0.1)",
		data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
	    }
	]
    }
	

/*******************************
PIE CHART
*******************************/
    var pieData = [
	{
	    value: 250,
	    color: "rgba(131,191,23,0.9)",
	    highlight: "rgba(131,191,23,1)",
	    label: "2015"
	},
	{
	    value: 50,
	    color: "rgba(54,54,54,0.9)",
	    highlight: "rgba(54,54,54,1)",
	    label: "2014"
	},
	{
	    value: 100,
	    color: "rgba(241,93,88,0.9)",
	    highlight: "rgba(241,93,88,1)",
	    label: "2013"
	},
	{
	    value: 40,
	    color: "rgba(166,143,88,0.9)",
	    highlight: "rgba(166,143,88,1)",
	    label: "2012"
	},
	{
	    value: 120,
	    color: "rgba(220,221,205,0.9)",
	    highlight: "rgba(220,221,205,1)",
	    label: "2011"
	}
    
    ];

 var pieData1 = [
	{
	    value: 250,
	    color: "rgba(131,191,23,0.9)",
	    highlight: "rgba(131,191,23,1)",
	    label: "2015"
	} ];
 
 
 



/*******************************
INIT CHARTS
*******************************/
    window.onload = function(){
	//BAR
	var ctx = document.getElementById("bar-chart").getContext("2d");
	window.myBar = new Chart(ctx).Bar(barChartData, {
	    responsive : true,
	    maintainAspectRatio: false
	});
	
	//LINE
	var ctx = document.getElementById("line-chart").getContext("2d");
	window.myLine = new Chart(ctx).Line(lineChartData, {
	    responsive: true,
	    maintainAspectRatio: false
	});
	
	//PIE
	var ctx = document.getElementById("pie-chart").getContext("2d");
	window.myPie = new Chart(ctx).Pie(pieData, {
	    responsive : true,
	    maintainAspectRatio: false,
	    animateScale: true
	});

	
	
    }
});//END