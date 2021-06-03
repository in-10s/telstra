
         function bareChart() {
            $("#dchart").kendoChart({
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
                    name: "Total customers",
                    data: [3000, 7943, 5848],
					color:"#f99d29",
                }, {
                    name: "Revenue customers",
                    data: [4743, 7295, 7175],
					color:"#2372b8",
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
                    categories: ['1st quarter', '2nd quarter', '3rd quarter'],
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

$(document).ready(bareChart);
        //$(document).bind("kendo:skinChange", bareChart);