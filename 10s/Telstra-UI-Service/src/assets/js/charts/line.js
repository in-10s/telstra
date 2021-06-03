
		
		 function createLineChart() {
            $("#linechart").kendoChart({
               
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
                    data: [2083, 1836, 1637, 2044, 1947],
                    color: "#f3ac32"
                }, {
                    name: "Fixed line",
                    data: [1560, 1631, 1234, 1432, 1524],
                    color: "#d60102"
                }, {
                    name: "Broadband",
                    data: [1000, 1027, 1337, 1225, 1433],
                    color: "#003a90"
                }],
                valueAxis: {
                    max: 6000,
                    line: {
                        visible: false
                    },
                    minorGridLines: {
                        visible: true
                    }
                },
                categoryAxis: {
                    categories: ['Mar-16', 'Feb-16', 'Jan-16', 'Dec-15', 'Nov-15'],
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

        $(document).ready(createLineChart);
        $(document).bind("kendo:skinChange", createLineChart);
  