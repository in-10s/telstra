$(function () {

    // Prepare demo data
    var data = [
        {
            "hc-key": "nz-wk",
            "value":  950332.96 
        },
        {
            "hc-key": "nz-ca",
            "value":  1561125.90 
        },
        {
            "hc-key": "nz-wg",
            "value":  1274930.69 
        }
    ];

    // Initiate the chart
    $('#map_chart').highcharts('Map', {

        title : {
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
							
							if(this.name=='Waikato'){
							//alert('map1 ');
								map1(this.name,Number(this.value).toFixed(3));
							}else if(this.name=='Canterbury'){
							//alert('map2');
								map2(this.name,this.value);
							}else if(this.name=='Wellington'){
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
            mapData: Highcharts.maps['countries/nz/nz-all'],
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
            data: Highcharts.geojson(Highcharts.maps['countries/nz/nz-all'], 'mapline'),
            color: 'silver',
            showInLegend: false,
            enableMouseTracking: false
        }]
    });
	
	
	
	$('#map_chart_drill').highcharts({title : {text : ''},
        chart: {
		type: 'pie',options3d: {enabled: true,alpha: 45}},
        plotOptions: {pie: {innerSize: 100,depth: 75}},		
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> <br/>'
        },
        series: [{name: 'Service',colorByPoint: true,
            data: [{name: 'Mobility',y: 4568125.52,drilldown: 'Mobility',color: '#FF9800'}, 
					{name: 'Fixed line',y: 1687951.73 ,drilldown: 'Fixed line',color: '#8BC34A'},
					{name: 'Broadband',y: 1725832.38 ,color: '#2196F3'}]
        }],		
        drilldown: {
            series: [{
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local',  1044959.00],
                    ['Domestic Long Distance', 953880.00],
                    ['International',  895601.00],
                    ['Data',  821322.00],
                    ['Roaming', 728043.00 ],
                    ['Msg', 124320.52]
                ]
            }, {
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                    {name:'Local', y: 554392.00 ,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y: 563316.00 ,color:'#FBA026'},
                    {name:'International',y:  570243.73 ,color:'#90ED7D'}
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
            data: [{name: 'Mobility',y:  1368885.00 ,drilldown: 'Mobility',color: '#019E0F'}, 
					{name: 'Fixed line',y:  545718.00,drilldown: 'Fixed line',color: '#0177BF'},
					{name: 'Broadband',y:  964270.04,color: '#CD0B02'}]
        }],		
        drilldown: {
			
            series: [{
				tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of 1368885.00<br/>'
        },
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local',  423409.00],
                    ['Domestic Long Distance',  332330.00 ],
                    ['International',  274051.00 ],
                    ['Data',  199772.00 ],
                    ['Roaming',  106493.00 ],
                    ['Msg',  32830.00 ]
                ]
            }, {tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of 545718.00<br/>'
        },
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                    {name:'Local', y: 169833.00 ,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y: 182195.00 ,color:'#FBA026'},
                    {name:'International',y:  193690.00,color:'#90ED7D'}
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
            data: [{name: 'Mobility',y: 1702115.52,drilldown: 'Mobility',color: '#2196F3'}, 
					{name: 'Fixed line',y: 522080.00,drilldown: 'Fixed line',color: '#8BC34A'},
					{name: 'Broadband',y: 663069.62,color: '#FF9800'}]
        }],		
        drilldown: {
            series: [{tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of 1702115.52<br/>'
        },
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local', 538109.00],
                    ['Domestic Long Distance',  382030.00],
                    ['International',  323751.00],
                    ['Data',  249472.00],
                    ['Roaming',  156193.00],
                    ['Msg',  52560.52]
                ]
            }, {
				tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of 522080.00<br/>'
        },
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                    {name:'Local', y: 161192.00 ,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y: 173679.00 ,color:'#FBA026'},
                    {name:'International',y:  185209.00 ,color:'#90ED7D'}
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
            data: [{name: 'Mobility',y:  1497125.00,drilldown: 'Mobility',color: '#50B432'}, 
					{name: 'Fixed line',y:  620153.73,drilldown: 'Fixed line',color: '#ED561B'},
					{name: 'Broadband',y:  842348.04,color: '#DDDF00'}]
        }],		
        drilldown: {
            series: [{
				tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of 1497125.00<br/>'
        },
                name: 'Mobility',
                id: 'Mobility',
                data: [
                    ['Local',  479809.00],
                    ['Domestic Long Distance',  352230.00],
                    ['International', 293951.00],
                    ['Data',  219672.00],
                    ['Roaming',  125393.00],
                    ['Msg',  26070.00]
                ]
            }, {
				tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of 620153.73<br/>'
        },
                name: 'Fixed line',
                id: 'Fixed line',
                data: [
                    {name:'Local', y: 194562.00 ,color:'#7CB5EC'},
                    {name:'Domestic Long Distance', y: 207046.00 ,color:'#FBA026'},
                    {name:'International',y: 218545.73,color:'#90ED7D'}
                ]
            }]}
    });
  }
	
	
	
	
	
});
