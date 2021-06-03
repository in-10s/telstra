
var data=[{"value": 34.2,"code": "wa"},{"value": 195.18,"code": "ny"},{"value": 30.75,"code": "tx"},{ "value": 114.43, "code": "fl" }]

  // Make codes uppercase to match the map data
  $.each(data, function () {
    this.code = this.code.toUpperCase();
  });

  // Instantiate the map
  Highcharts.mapChart('container', {

    chart: {
      map: 'countries/us/us-all',
      borderWidth: 0
    },

    title: {
      text: ''
    },

    exporting: {
      sourceWidth: 600,
      sourceHeight: 500
    },

    legend: {
      layout: 'horizontal',
      borderWidth: 0,
      backgroundColor: 'transparent',
      floating: true,
      verticalAlign: 'top',
      enabled:false,
      y: 25
    },

    mapNavigation: {
      enabled: false
    },

    colorAxis: {
      min: 1,
      type: 'logarithmic',
      minColor: '#cc005d',
      maxColor: '#cc005d',
      stops: [
        [0, '#cc005d'],
        [0.67, '#cc005d'],
        [1, '#cc005d']
      ]
    },

    series: [{
      animation: {
        duration: 1000
      },
      data: data,
      joinBy: ['postal-code', 'code'],
      dataLabels: {
        enabled: true,
        color: '#FFFFFF',
        format: '{point.code}'
      },
      name: 'Population density',
      tooltip: {
        pointFormat: '{point.code}: {point.value}/km²'
      }
    }]
  });

