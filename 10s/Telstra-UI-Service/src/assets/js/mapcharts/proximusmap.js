$(function () {

    // Prepare demo data
    var data = [
        
        {
            "hc-key": "be-3535",
            "value": 3380.40
        },        
        {
            "hc-key": "be-3527",
            "value": 3126.00
        },
        {
            "hc-key": "be-3534",
            "value": 4337.60
        }
    ];

    // Initiate the chart
	oldFill = 'rgb(68,108,156)';
    var mapChart=$('#map_chart').highcharts('Map', {

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
							
                            $(mapChart.find("path")).each(function(){
                            	if($(this)[0].attributes.fill.value === 'rgb(255,112,0)'){
                                	$(this)[0].attributes.fill.value = oldFill;
                                }
                            });
                            oldFill = 'rgb(68,108,156)';
                            this.color = 'rgb(255,112,0)';
							
							
							if(this.name=='Antwerp'){
							//alert('map1 ');
								map1(this.name,Number(this.value).toFixed(3));
							}else if(this.name=='Luxembourg'){
							//alert('map2');
								map2(this.name,this.value);
								
							}else if(this.name=='West Flanders'){
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
            mapData: Highcharts.maps['countries/be/be-all'],
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
            data: Highcharts.geojson(Highcharts.maps['countries/be/be-all'], 'mapline'),
            color: 'silver',
            showInLegend: false,
            enableMouseTracking: false
        }]
    });
	
	
    $('#dep_chart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: { categories: [
                'Consulting',
                'Development',
                'Marketing',
                'Delivery',
                'Sales'
               
            ],
            crosshair: true,
            type: 'Departments'
        },
        yAxis: {
            title: {
                text: 'Amount'
            }

        },
        legend: {
            enabled: false
        },
         plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            //alert(this.y);
							if(this.y=='10214.48'){
							//alert('map1 ');
								consulting(this.y);
							}
							else if(this.y=='12091')
							{
								development(this.y);
							}
							else if(this.y=='9853')
							{
								marketing(this.y);
							}
							else if(this.y=='12780')
							{
								sales(this.y);
							}
							else if(this.y=='13678')
							{
								delivery(this.y);
							}	
                        }
                    }
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> <br/>'
        },

        series: [{
           
           
			 
            name: 'Department',
            data: [10214.48, 12091,9853,13678,12780]

        
           
        }],
      
    });

	
	
	 $('#dep_chart_drill').highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.2f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
        },
        series: [{
            name: 'All Departments',
            colorByPoint: true,
            data: [{
                name: 'Mobility',
                y: 33303.98,
                drilldown: 'Mobility'
            }, {
                name: 'Fixed line',
                y: 13589.2,
                drilldown: 'Fixed line'
            }/*, {
                name: 'Broadband',
                y: 11723.3,
                drilldown: 'Broadband'
            }*/]
        }],
        drilldown: {
            series: [{
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local', 13072],
                    ['Domestic Long Distance', 9056.78],
                    ['International', 9315],
                    ['Data', 1127],
                    ['Msg', 171.2],
                    ['Roaming', 562]
                ]
            }, {
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                    ['International', 4913],
                    ['Local', 6470],
                    ['Domestic Long Distance', 2206.2]
                    
                    
                ]
            }/*, {
                name: 'Broadband',
                id: 'Broadband1',
                data: [
                    ['v35', 2.76],
                    ['v36', 2.32]
                    
                ]
            }*/]
        }
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
					//{name: 'Broadband',y: 2732.00,color: '#2196F3'}
					]
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
            data: [{name: 'Mobility',y: 14967.91,drilldown: 'Mobility',color: '#019E0F'}, 
					{name: 'Fixed line',y: 1790.90,drilldown: 'Fixed line',color: '#0177BF'},
					//{name: 'Broadband',y: 956.20,color: '#CD0B02'}
					]
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
            data: [{name: 'Mobility',y: 12948,drilldown: 'Mobility',color: '#2196F3'}, 
					{name: 'Fixed line',y: 1350.56,drilldown: 'Fixed line',color: '#8BC34A'},
					//{name: 'Broadband',y: 683.00,color: '#FF9800'}
					]
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
            data: [{name: 'Mobility',y: 18945.59,drilldown: 'Mobility',color: '#50B432'}, 
					{name: 'Fixed line',y: 1438.50,drilldown: 'Fixed line',color: '#ED561B'},
					//{name: 'Broadband',y: 1092.80,color: '#DDDF00'}
					]
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
	
	function consulting(amount)
	{
		
	$('#dep_chart_drill').highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.2f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f} </b> of '+amount+'  <br/>'
        },
        series: [{
            name: 'Consulting',
            colorByPoint: true,
            data: [{
                name: 'Mobility',
                y: 6376,
                drilldown: 'Mobility'
            }, {
                name: 'Fixed line',
                y: 2698,
                drilldown: 'Fixed line'
            }
			/*, {
                name: 'Broadband',
                y: 1140.48,
                drilldown: 'Broadband'
            }*/]
        }],
        drilldown: {
            series: [{
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local', 1290],
                    ['Domestic Long Distance', 1867],
                    ['International', 2909],
                    ['Data', 190],
                    ['Msg', 30],
                    ['Roaming', 90]
                ]
            }, {
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                    {name:'Local', y:1467,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y:355,color:'#FBA026'},
                    {name:'International',y: 876,color:'#90ED7D'}
                ]
            }]
        }
    });
}	
function development(amount)
	{
		
	$('#dep_chart_drill').highcharts({
		title : {text : ''},
         chart: {type: 'pie',options3d: {enabled: true,alpha: 45}},
            plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.2f}'
                }
            }
        },	
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f} </b> of '+amount+'  <br/>'
        },
        series: [{name:'Development',colorByPoint: true,
            data: [{name: 'Mobility',y: 7238,drilldown: 'Mobility',color: '#2196F3'}, 
					{name: 'Fixed line',y: 2598,drilldown: 'Fixed line',color: '#8BC34A'},
					//{name: 'Broadband',y: 2255,color: '#FF9800'}
					]
        }],		
        drilldown: {
            series: [{tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of 1452.50<br/>'
        },
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local', 2098],
                    ['Domestic Long Distance', 2247],
                    ['International', 2543],
                    ['Data', 180],
                    ['Roaming', 125],
                    ['Msg', 30]
                ]
            }, {
				tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of 990.50<br/>'
        },
                name: 'Fixed line',
                id: 'Fixed line',	
                data: [
                    {name:'Local', y:1298,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y:899,color:'#FBA026'},
                    {name:'International',y: 401,color:'#90ED7D'}
                ]
            }]
        }
    });
}	
function marketing(amount)
	{
		
	$('#dep_chart_drill').highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.2f}'
                }
            }
        },

       tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f} </b> of '+amount+'  <br/>'
        },
        series: [{
            name: 'Marketing',
            colorByPoint: true,
            data: [{name: 'Mobility',y: 5907,drilldown: 'Mobility',color: '#50B432'}, 
					{name: 'Fixed line',y: 1075,drilldown: 'Fixed line',color: '#ED561B'},
					//{name: 'Broadband',y: 2871,color: '#DDDF00'}
					]
        }],
        drilldown: {
            series: [{
                 name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local', 3098],
                    ['Domestic Long Distance', 1305.75],
                    ['International', 1092],
                    ['Data', 210],
                    ['Roaming', 176],
                    ['Msg', 25.25]
					]
            }, {
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                   {name:'Local', y:598,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y:298,color:'#FBA026'},
                    {name:'International',y: 179,color:'#90ED7D'}
                ]
            }]
        }
    });
}
function sales(amount)
	{
		
	$('#dep_chart_drill').highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.2f}'
                }
            }
        },

       tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f} </b> of '+amount+'  <br/>'
        },
        series: [{
            name: 'Delivery',
            colorByPoint: true,
            data: [{
                name: 'Mobility',
                y: 6684.98,
                drilldown: 'Mobility'
            }, {
                name: 'Fixed line',
                y: 3506.2,
                drilldown: 'Fixed line'
            }/*, {
                name: 'Broadband',
                y: 2588.82,
                drilldown: 'Broadband'
            }*/]
        }],
        drilldown: {
            series: [{
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local', 2678],
                    ['Domestic Long Distance', 1757.03],
                    ['International', 1785],
                    ['Data', 319],
                    ['Msg', 50.95],
                    ['Roaming', 95]
                ]
            }, {
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                    {name:'Local', y:1809,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y:722.2,color:'#FBA026'},
                    {name:'International',y: 975,color:'#90ED7D'}
                ]
            }]
        }
    });
}
function delivery(amount)
	{
		
	$('#dep_chart_drill').highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.2f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f} </b> of '+amount+'  <br/>'
        },
        series: [{
            name: 'Sales',
            colorByPoint: true,
            data: [{
                name: 'Mobility',
                y: 7098,
                drilldown: 'Mobility'
            }, {
                name: 'Fixed line',
                y: 3712,
                drilldown: 'Fixed line'
            }/*, {
                name: 'Broadband',
                y: 2868,
                drilldown: 'Broadband'
            }*/]
        }],
        drilldown: {
            series: [{
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local', 3908],
                    ['Domestic Long Distance', 1880],
                    ['International', 986],
                    ['Data', 228],
                    ['Msg', 20],
                    ['Roaming', 76]
                ]
            }, {
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                    {name:'Local', y:1298,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y:549,color:'#FBA026'},
                    {name:'International',y: 1865,color:'#90ED7D'}
                ]
            }]
        }
    });
}
    });

	


$(document ).ready(function() {
	$("#dep_chart").hide();
	$("#dep_chart_drill").hide();
	//alert("dsf");
	$( "#selectGD" ).change(function() {
		//alert("dsfdsf");
		if($(this).val()=="1")
		{
			//alert("graph1");
			$("#map_chart").show();
			$("#map_chart_drill").show();
			$("#dep_chart_drill").hide();
			$("#dep_chart").hide();
			//alert("graph1_1");
  
		}
		if($(this).val()=="2")
		{
			//alert("graph2");
			$("#map_chart").hide();
			$("#map_chart_drill").hide();
			$("#dep_chart").show();
			$("#dep_chart_drill").show();
  
		}
					
});
	
});



 