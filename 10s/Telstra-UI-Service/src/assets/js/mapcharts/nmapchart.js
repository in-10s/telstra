$(function () {
$('#map_chart_drill').highcharts({title : {text : ''},
        chart: {
		type: 'pie',options3d: {enabled: true,alpha: 45}},
        plotOptions: {pie: {innerSize: 100,depth: 35}},		
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.3f}</b> <br/>'
        },
        series: [{name: 'Service',colorByPoint: true,
            data: [{name: 'Mobility',y: 4150.000,drilldown: 'Mobility',color: '#FF9800'}, 
					{name: 'Fixed line',y: 3962.000,drilldown: 'Fixed line',color: '#8BC34A'},
					{name: 'Broadband',y: 2732.000,color: '#2196F3'}]
        }],		
        drilldown: {
            series: [{
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local', 1037.500],
                    ['Domestic Long Distance', 1245.000],
                    ['International', 1245.000],
                    ['Data', 622.500],
                    ['Roaming', 0.000],
                    ['Msg', 0.000]
                ]
            }, {
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                    {name:'Local', y:1981.000,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y:792.400,color:'#FBA026'},
                    {name:'International',y: 1188.600,color:'#90ED7D'}
                ]
            }]}
    });
 function map1(serviceName,total){
	$('#map_chart_drill').highcharts({title : {text : ''},
        chart: {type: 'pie',options3d: {enabled: true,alpha: 45}},
        plotOptions: {pie: {innerSize: 100,depth: 15}},		
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.3f}</b> of '+total+'<br/>'
        },
        series: [{name: serviceName,colorByPoint: true,
            data: [{name: 'Mobility',y: 1037.500,drilldown: 'Mobility',color: '#019E0F'}, 
					{name: 'Fixed line',y: 1386.700,drilldown: 'Fixed line',color: '#0177BF'},
					{name: 'Broadband',y: 956.200,color: '#CD0B02'}]
        }],		
        drilldown: {
			
            series: [{
				tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.3f}</b> of 1037.500<br/>'
        },
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local', 259.375],
                    ['Domestic Long Distance', 311.250],
                    ['International', 311.250],
                    ['Data', 155.625],
                    ['Roaming', 0.000],
                    ['Msg', 0.000]
                ]
            }, {tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.3f}</b> of 1386.700<br/>'
        },
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                    {name:'Local', y:693.350,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y:416.010,color:'#FBA026'},
                    {name:'International',y: 277.340,color:'#90ED7D'}
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
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.3f}</b> of '+total+'<br/>'
        },
        series: [{name:serviceName,colorByPoint: true,
            data: [{name: 'Mobility',y: 1452.500,drilldown: 'Mobility',color: '#2196F3'}, 
					{name: 'Fixed line',y: 990.500,drilldown: 'Fixed line',color: '#8BC34A'},
					{name: 'Broadband',y: 683.000,color: '#FF9800'}]
        }],		
        drilldown: {
            series: [{tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.3f}</b> of 1452.500<br/>'
        },
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local', 363.125],
                    ['Domestic Long Distance', 435.600],
                    ['International', 435.600],
                    ['Data', 217.800],
                    ['Roaming', 0.000],
                    ['Msg', 0.000]
                ]
            }, {
				tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.3f}</b> of 990.500<br/>'
        },
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                    {name:'Local', y:495.250,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y:297.150,color:'#FBA026'},
                    {name:'International',y: 198.100,color:'#90ED7D'}
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
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.3f}</b> of '+total+'<br/>'
        },
        series: [{name:serviceName,colorByPoint: true,
            data: [{name: 'Mobility',y: 1660.000,drilldown: 'Mobility',color: '#50B432'}, 
					{name: 'Fixed line',y: 1584.800,drilldown: 'Fixed line',color: '#ED561B'},
					{name: 'Broadband',y: 1092.800,color: '#DDDF00'}]
        }],		
        drilldown: {
            series: [{
				tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.3f}</b> of 1660.000<br/>'
        },
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local', 415.000],
                    ['Domestic Long Distance', 498.000],
                    ['International', 498.000],
                    ['Data', 249.000],
                    ['Roaming', 0.000],
                    ['Msg', 0.000]
                ]
            }, {
				tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.3f}</b> of 1584.800<br/>'
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
  
  
  
  
  data=[
        {
            "hc-key": "om-ja",
            "value": 3380.400

        },
        {
            "hc-key": "om-bn",
            "value": 4337.600

        },
        {
            "hc-key": "om-sh",
            "value": 3126.000

        }
		/*,
        {
            "hc-key": "om-bs",
            "value": 4337.600

        }
		*/];

		
		    // Initiate the chart
    var oldFill = 'rgb(68,108,156)';
    var mapChart = $('#map_chart').highcharts('Map', {
        title : {text : ''},

        subtitle : {
            text : ''
        },
        mapNavigation: {
           enabled: true,
            enableButtons:false
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
							
							
							if(this.name=='Dhofar'){
							//alert('map1 ');
								map1(this.name,Number(this.value).toFixed(3));
							}else if(this.name=='Al Sharqiya North'){
							//alert('map2');
								map2(this.name,this.value);
							}else if(this.name=='Al Batina North'){
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
            mapData: Highcharts.maps['countries/om/om-all'],
            joinBy: 'hc-key',
			name: 'Cost centre',
			tooltip: {
                    pointFormat: '{point.name}: {point.value:.3f}'
                },
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: data,
                format: '{point.name}'
            }
        }]
    });
		
		/*
		   // Initiate the chart
   var mapchart= $('#map_chart').highcharts('Map', {

        title : {text : ''},

        subtitle : {
            text : ''
        },

        mapNavigation: {
            enabled: true,
            enableButtons:false
        },

        colorAxis: {
            min: 0
        },
		plotOptions:{
        	series:{
            	point:{
                	events:{
                    	click: function(){
                        	alert(this.name);
                            $(mapChart.find("path")).each(function(){
                            	if($(this)[0].attributes.fill.value === 'rgb(255,0,0)'){
                                	$(this)[0].attributes.fill.value = oldFill;
                                }
                            });
                            oldFill = this.color;
                            this.color = "rgb(255,0,0)";
                        }
                    }
                }
            }
        },

        series : [{
            data : data,
            mapData: Highcharts.maps['countries/om/om-all'],
            joinBy: 'hc-key',
            name: 'Cost centre',
			tooltip: {
                    pointFormat: '{point.name}: {point.value:.3f}'
                },
            states: {
				allowPointSelect: true,
				select: {
                        fillColor: '#ACACAA'
                    },
                hover: {
                    color: '#BADA55'
                }
				
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });
	
	*/
	/*	
        Highcharts.setOptions({
        plotOptions: {
            series: {
				point: {
                    events: {
                        click: function () {
						
						if(this.value!=null){
						//alert('Category: '+ this.name+' '+this.value);
						
						$(mapChart.find("path")).each(function(){
                            	if($(this)[0].attributes.fill.value === 'rgb(255,0,0)'){
                                	$(this)[0].attributes.fill.value = oldFill;
                                }
                            });
                            oldFill = this.color;
                            this.color = "rgb(255,0,0)";
							if(this.name=='Dhofar'){
							//alert('map1 ');
								map1(this.name,Number(this.value).toFixed(3));
							}else if(this.name=='Al Sharqiya North'){
							//alert('map2');
								map2(this.name,this.value);
							}else if(this.name=='Al Batina North'){
							//alert('map3');
								map3(this.name,this.value);
							}else if(this.name=='Al Batina South'){
							//alert('map3');
								map3(this.name,this.value);
							}
						
						
						
						//alert('Category: '+ this.name+' '+this.value);
						//map();
						}else{
						//alert("nulllll");
						}
                            
                        }
                    }
                }
            }
        }
    });
 
	*/
	
	
	
	
});
