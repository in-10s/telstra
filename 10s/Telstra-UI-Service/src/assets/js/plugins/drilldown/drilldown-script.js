$(function () {
        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Monthly Average Rainfall'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: [
                    'CAT 1',
                    'CAT2'
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                   			 '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Tokyo',
                data: [49.9,71]
    
            }, {
                name: 'New York',
                data: [{y:49.9, drilldown:'ny 1'}, 71.5]
    
            }],
            drilldown:{
                series: [ 
                {name:'nyc1',
                    id: 'ny 1',
                    data: [{y:39.9, name:'name1'}, {y:31.5, name:'name2'}]
        
                }, {name:'nyc2',
                    id: 'ny 1',
                    data: [{y:39.9, name:'name1'}, {y:31.5, name:'name2'}]
        
                }]
              }
        });
    });
    