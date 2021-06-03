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
	labels : ["Task 1","Task 2","Task 3","Task 4","Task 5","Task 6","Task 7"],
	
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
PIE CHART
*******************************/
    var pieData = [
	{
	    value: 250,
	    color: "rgb(156, 42, 160)",
	    highlight: "rgb(156, 42, 160)",
	    label: "45%"
	},
	{
	    value: 50,
	    color: "rgb(255, 84, 0)",
	    highlight: "rgb(255, 84, 0)",
	    label: "15%"
	},
	{
	    value: 100,
	    color: "rgb(0, 176, 202)",
	    highlight: "rgb(0, 176, 202)",
	    label: "10%"
	},
	{
	    value: 40,
	    color: "rgb(66, 134, 0)",
	    highlight: "rgb(66, 134, 0)",
	    label: "4%"
	},
	{
	    value: 120,
	    color: "rgb(94, 39, 80)",
	    highlight: "rgb(94, 39, 80)",
	    label: "12%"
	}
    
    ];

/*******************************
INIT CHARTS
*******************************/
    window.onload = function(){
	//BAR
        try{
	var ctx = document.getElementById("bar-chart").getContext("2d");
	window.myBar = new Chart(ctx).Bar(barChartData, {
	    responsive : true,
	    maintainAspectRatio: false
	});
	//PIE
	var ctx = document.getElementById("pie-chart").getContext("2d");
	window.myPie = new Chart(ctx).Pie(pieData, {
	    responsive : true,
	    maintainAspectRatio: false,
	    animateScale: true
	});
        }catch(e){}
	
    }
});//END