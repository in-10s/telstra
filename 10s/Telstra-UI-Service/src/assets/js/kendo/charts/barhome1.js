
         function bareCharthh() {
            $("#dchart3").kendoChart({
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
                    name: "Cost Center wise Spend",
                    data: [1200, 943, 1648, 943, 648, 1048,],
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
                    categories: ['Costcenter1', 'Costcenter2', 'Costcenter3', 'Costcenter4', 'Costcenter5', 'Costcenter6'],
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

$(document).ready(bareCharthh);
        //$(document).bind("kendo:skinChange", bareCharthh);