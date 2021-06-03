
		
		 function createLineChart1() {
            $("#linechart1").kendoChart({
               
                legend: {
                    visible: true
                },
                seriesDefaults: {
                    type: "line",
                    missingValues: "gap",
                    stack: true
                },
                series: [{
                    name: "Mobile",
                    data: [83, 36, 37, 44, 47],
                    color: "#383838"
                }, {
                    name: "Fixed line",
                    data: [60, 31, 34, 32, 24],
                    color: "#005c9d"
                }, {
                    name: "Broadband",
                    data: [30, 27, 37, 25, 33],
                    color: "#0090da"
                }],
                valueAxis: {
                    max: 180,
                    line: {
                        visible: false
                    },
                    minorGridLines: {
                        visible: true
                    }
                },
                categoryAxis: {
                     categories: [2013, 2014, 2015, 2016],
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
  