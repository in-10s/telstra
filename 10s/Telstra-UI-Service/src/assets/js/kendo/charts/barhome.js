
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
                series: [{    overlay: {
                gradient: "none"
            },
                    name: "Spend",
                    data: [3000, 7943, 5848],
					color:"#E4002B",
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
                    categories: ['Mobile', 'Connectivity & Fixed Voice', 'Network & Managed cloud'],
                    line: {
                        visible: false
                    },
                    labels: {
						format: " "
                        //padding: {top: 135}
                    }
                },
                tooltip: {
                    visible: true,  format: "J${0}",
                    template: "#= series.name #: #= value #"
                }
            });
        }

$(document).ready(bareCharth);
        //$(document).bind("kendo:skinChange", bareCharth);