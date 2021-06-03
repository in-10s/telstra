
		
		 function createLineChart1() {
            $("#linechart1").kendoChart({
               
                legend: {
                   position: "top"
                },
                seriesDefaults: {
                    type: "line",
                    missingValues: "gap",
                    stack: true
                },
                series: [{
                    name: "GSM",
                    data: [830, 360, 370, 440, 470,300, 270, 670, 250, 330, 740, 630],
                    color: "#E4002B"
                }, {
                    name: "Digicel Play",
                    data: [600, 310, 340, 420, 740, 630, 360, 570, 440, 670,300, 270,],
                    color: "#53565A"
                }, {
                    name: "Network and Cloud Services",
                    data: [300, 270, 370, 250, 630, 360, 570, 440, 670, 330,420, 740,],
                    color: "#888B8D"
                }],
                valueAxis: {
                    max: 2200,
                    line: {
                        visible: false
                    },
                    minorGridLines: {
                        visible: true
                    }
                },
                categoryAxis: {
                     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    majorGridLines: {
                        visible: true
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #= value #"
                }
            });
        }

        $(document).ready(createLineChart1);
        $(document).bind("kendo:skinChange", createLineChart1);
  