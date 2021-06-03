$(function () {

    // Prepare demo data
    var data = [
        {
            "hc-key": "us-ny",
            "value": 3380.40
        },
        {
            "hc-key": "us-ca",
            "value": 3126.00
        },
        {
            "hc-key": "us-il",
            "value": 4337.60
        }
    ];

    // Initiate the chart
    $('#map_chart').highcharts('Map', {

        title : {
            text : ''
        },

        subtitle : {
            text : ''
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },
		plotOptions:{
        	series:{
            	point:{
                	events:{
                    	click: function(){
                        	//alert(this.name);
							/*
                            $(mapChart.find("path")).each(function(){
                            	if($(this)[0].attributes.fill.value === 'rgb(255,112,0)'){
                                	$(this)[0].attributes.fill.value = oldFill;
                                }
                            });
                            oldFill = 'rgb(68,108,156)';
                            this.color = 'rgb(255,112,0)';
							*/
							
							if(this.name=='New York'){
							//alert('map1 ');
								map1(this.name,Number(this.value).toFixed(3));
							}else if(this.name=='California'){
							//alert('map2');
								map2(this.name,this.value);
							}else if(this.name=='Illinois'){
							//alert('map3');
								map3(this.name,this.value);
							}else if(this.name=='Al Batina South'){
							//alert('map3');
								map3(this.name,this.value);
							}
							
                        }
                    }
                }
            }
        },

        series : [{
            data : data,
            mapData: Highcharts.maps['countries/us/us-all'],
            joinBy: 'hc-key',
            name: 'Random data',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }, {
            name: 'Separators',
            type: 'mapline',
            data: Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
            color: 'silver',
            showInLegend: false,
            enableMouseTracking: false
        }]
    });
	
	
	
	$('#map_chart_drill').highcharts({title : {text : ''},
        chart: {
		type: 'pie',options3d: {enabled: true,alpha: 45}},
        plotOptions: {pie: {innerSize: 100,depth: 35}},		
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> <br/>'
        },
        series: [{name: 'Service',colorByPoint: true,
            data: [{name: 'Mobility',y: 4150.00,drilldown: 'Mobility',color: '#FF9800'}, 
					{name: 'Fixed line',y: 3962.00,drilldown: 'Fixed line',color: '#8BC34A'},
					{name: 'Broadband',y: 2732.00,color: '#2196F3'}]
        }],		
        drilldown: {
            series: [{
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local', 1037.50],
                    ['Domestic Long Distance', 1245.00],
                    ['International', 1245.00],
                    ['Data', 622.50],
                    ['Roaming', 0.00],
                    ['Msg', 0.00]
                ]
            }, {
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                    {name:'Local', y:1981.00,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y:792.40,color:'#FBA026'},
                    {name:'International',y: 1188.60,color:'#90ED7D'}
                ]
            }]}
    });
 function map1(serviceName,total){
	$('#map_chart_drill').highcharts({title : {text : ''},
        chart: {type: 'pie',options3d: {enabled: true,alpha: 45}},
        plotOptions: {pie: {innerSize: 100,depth: 15}},		
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of '+total+'<br/>'
        },
        series: [{name: serviceName,colorByPoint: true,
            data: [{name: 'Mobility',y: 1037.50,drilldown: 'Mobility',color: '#019E0F'}, 
					{name: 'Fixed line',y: 1386.70,drilldown: 'Fixed line',color: '#0177BF'},
					{name: 'Broadband',y: 956.20,color: '#CD0B02'}]
        }],		
        drilldown: {
			
            series: [{
				tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of 1037.50<br/>'
        },
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local', 259.37],
                    ['Domestic Long Distance', 311.25],
                    ['International', 311.25],
                    ['Data', 155.62],
                    ['Roaming', 0.00],
                    ['Msg', 0.00]
                ]
            }, {tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of 1386.70<br/>'
        },
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                    {name:'Local', y:693.35,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y:416.01,color:'#FBA026'},
                    {name:'International',y: 277.34,color:'#90ED7D'}
                ]
            }]}
    });
  }
  
 function map2(serviceName,total){
	$('#map_chart_drill').highcharts({title : {text : ''},
        chart: {type: 'pie',options3d: {enabled: true,alpha: 45}},
        plotOptions: {pie: {innerSize: 100,depth: 15}},		
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of '+total+'<br/>'
        },
        series: [{name:serviceName,colorByPoint: true,
            data: [{name: 'Mobility',y: 1452.50,drilldown: 'Mobility',color: '#2196F3'}, 
					{name: 'Fixed line',y: 990.50,drilldown: 'Fixed line',color: '#8BC34A'},
					{name: 'Broadband',y: 683.00,color: '#FF9800'}]
        }],		
        drilldown: {
            series: [{tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of 1452.50<br/>'
        },
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local', 363.12],
                    ['Domestic Long Distance', 435.60],
                    ['International', 435.60],
                    ['Data', 217.80],
                    ['Roaming', 0.00],
                    ['Msg', 0.00]
                ]
            }, {
				tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of 990.50<br/>'
        },
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                    {name:'Local', y:495.25,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y:297.15,color:'#FBA026'},
                    {name:'International',y: 198.10,color:'#90ED7D'}
                ]
            }]}
    });
  }
 function map3(serviceName,total){
	$('#map_chart_drill').highcharts({title : {text : ''},
        chart: {type: 'pie',options3d: {enabled: true,alpha: 45}},
        plotOptions: {pie: {innerSize: 100,depth: 15}},		
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of '+total+'<br/>'
        },
        series: [{name:serviceName,colorByPoint: true,
            data: [{name: 'Mobility',y: 1660.00,drilldown: 'Mobility',color: '#50B432'}, 
					{name: 'Fixed line',y: 1584.80,drilldown: 'Fixed line',color: '#ED561B'},
					{name: 'Broadband',y: 1092.80,color: '#DDDF00'}]
        }],		
        drilldown: {
            series: [{
				tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of 1660.00<br/>'
        },
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local', 415.00],
                    ['Domestic Long Distance', 498.00],
                    ['International', 498.00],
                    ['Data', 249.00],
                    ['Roaming', 0.00],
                    ['Msg', 0.00]
                ]
            }, {
				tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of 1584.80<br/>'
        },
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                    {name:'Local', y:792.4,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y:475.44,color:'#FBA026'},
                    {name:'International',y: 316.96,color:'#90ED7D'}
                ]
            }]}
    });
  }
	
	
	
	
	
});
