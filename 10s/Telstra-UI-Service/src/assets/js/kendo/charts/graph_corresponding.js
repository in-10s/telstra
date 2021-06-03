
         function bareCharth() {
            $("#dchart2").kendoChart({
                title: {
                    //text: "Gross domestic product growth /GDP annual %/"
                },
				 height:'400px',
                legend: {
                    position: "top"
                },
                seriesDefaults: {
                    type: "column"
                },
                series: [{
                    name: "MS",
                    data: [150, 30],
					color:"#005fa8",
                }, {
                    name: "AL",
                    data: [90, 20],
					color:"#eb0029",
                }, {
                    name: "LA",
                    data: [80, 18],
					color:"#439646",
                }, {
                    name: "TN",
                    data: [70, 18],
					color:"#56189e",
                }],
                valueAxis: {
                    labels: {
                        format: "{0}"
                    },
                    line: {
                        visible: false
                    },
                    axisCrossingValue: 0
                },
                categoryAxis: {
                    categories: ['MNY Mismatches', 'NON MNY Mismatches'],
                    line: {
                        visible: false
                    },
                    labels: {
						format: " "
                        //padding: {top: 135}
                    }
                },
                tooltip: {
                    visible: true,
                    format: "{0}",
                    template: "#= series.name #: #= value #"
                }
            });
        }

$(document).ready(bareCharth);
        //$(document).bind("kendo:skinChange", bareCharth);