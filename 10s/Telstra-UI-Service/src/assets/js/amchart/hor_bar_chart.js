var chart = AmCharts.makeChart("chartdiv", {
	"type": "serial",
    "path": "http://www.amcharts.com/lib/3/",
	"categoryField": "year",
	"rotate": true,
	"startDuration": 1,
	"categoryAxis": {
		"gridPosition": "start",
		"position": "left"
	},
	"trendLines": [],
	"graphs": [
		{
			"balloonText": "Income:[[value]]",
			"fillAlphas": 0.8,
			"id": "AmGraph-1",
			"lineAlpha": 0.2, 
			"title": "Income",
			"type": "column",
			"valueField": "income"
		},
		{
			"balloonText": "Expenses:[[value]]",
			"fillAlphas": 0.6,
			"id": "AmGraph-2",
			"lineAlpha": 0.2,
			"title": "Expenses",
			"type": "column",
			"valueField": "expenses"
		},
		{
			"balloonText": "Expenses:[[value]]",
			"fillAlphas": 0.4,
			"id": "AmGraph-3",
			"lineAlpha": 0.2,
			"title": "Result",
			"type": "column",
			"valueField": "result"
		}
	],
	"guides": [],
	"valueAxes": [
		{
			"id": "ValueAxis-1",
			"position": "bottom",
			"axisAlpha": 0
		}
	],
	"allLabels": [],
	"balloon": {},
	"titles": [],
	"dataProvider": [
		{
			"year": 'Africa',
			"income": 23.5,
			"expenses": 18.1,
			"result": 10.1
		},
		{
			"year": 'America',
			"income": 26.2,
			"expenses": 22.8,
			"result": 11.1
		},
		{
			"year": 'Asia',
			"income": 30.1,
			"expenses": 23.9,
			"result": 16.1
		},
		{
			"year": 'Europe',
			"income": 29.5,
			"expenses": 25.1,
			"result": 12.1
		},
		{
			"year": 'Oceania',
			"income": 24.6,
			"expenses": 25,
			"result": 11.1
		}
	],
    "export": {
    	"enabled": true
     }

});