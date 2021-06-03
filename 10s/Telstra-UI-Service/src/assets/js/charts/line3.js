 function createChart3() {
            $("#chart3").kendoChart({
               
                legend: {
                    visible: false
                },
                seriesDefaults: {
                    type: "line",
                    missingValues: "gap",
                    stack: true
                },
                series: [{
                    name: "Gold Medals",
                    data: [40, 32, 34, null, 83, 36, 37],
                    color: "#8c009d"
                }, {
                    name: "Silver Medals",
                    data: [19, 25, 21, null, 60, 31, 34],
                    color: "#009d00"
                }, {
                    name: "Bronze Medals",
                    data: [17, 17, 16, null, 30, 27, 37],
                    color: "#bb6e36"
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
                    categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016],
                    majorGridLines: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #= value #"
                }
            });
        }

        $(document).ready(createChart3);
        $(document).bind("kendo:skinChange", createChart3);
