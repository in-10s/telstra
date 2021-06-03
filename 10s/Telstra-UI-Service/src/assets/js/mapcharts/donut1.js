
// Create the chart
Highcharts.chart('piechart', {
   chart: {
    type: 'pie'
  },
  subtitle: {
    text: '3D donut in Highcharts'
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45
    }
  },

  "series": [
    {
      "name": "Browsers",
      "colorByPoint": true,
      "data": [
        {
          "name": "Chrome",
          "y": 62.74,
          "drilldown": "Chrome"
        },
        {
          "name": "Firefox",
          "y": 10.57,
          "drilldown": "Firefox"
        },
        {
          "name": "Internet Explorer",
          "y": 7.23,
          "drilldown": "Internet Explorer"
        }
       
      ]
    }
  ],
  "drilldown": {
    "series": [
      {
        "name": "Chrome",
        "id": "Chrome",
        "data": [
          [
            "v65.0",
            0.1
          ],
          
          [
            "v29.0",
            0.26
          ]
        ]
      },
      {
        "name": "Firefox",
        "id": "Firefox",
        "data": [
          [
            "v58.0",
            1.02
          ],
          [
            "v57.0",
            7.36
          ],
          [
            "v56.0",
            0.35
          ],
          [
            "v47.0",
            0.12
          ]
        ]
      },
      {
        "name": "Internet Explorer",
        "id": "Internet Explorer",
        "data": [
          [
            "v11.0",
            6.2
          ],
          [
            "v10.0",
            0.29
          ],
          [
            "v8.0",
            0.47
          ]
        ]
      }
     
    ]
  }
});