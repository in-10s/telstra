  function barlineChart() {
            $("#barlinechart").kendoChart({
              
                legend: {
                    position: "top"
                },
                series: [{
                    type: "column",
                    data: [2460, 3670, 3325, 3765, 4320],
                    stack: true,
                    name: "Total",
                    color: "#eb0029"
                },  {
                    type: "line",
                    data: [3237.8, 4226.2, 2315.9, 35367.4, 43575.6],
                    axis: "l100"
                }],
                valueAxes: [ {
                    name: "Total",
                  
                    min: 0,
                    max: 6161,
                    majorUnit: 6532
                },{
                    name: "l100",
                 
                    color: "#4e4141"
                }],
                categoryAxis: {
                    categories: ["Nov 2016","Dec 2016","Jan 2017","Feb 2017","March 2017"],
                    // Align the first two value axes to the left
                    // and the last two to the right.
                    //
                    // Right alignment is done by specifying a
                    // crossing value greater than or equal to
                    // the number of categories.
                    axisCrossingValues: [0, 0, 20, 20]
                },
              tooltip: {
                visible: true,
                format: "J$ {0:N0}"
            }
            });
        }
    
        $(document).ready(barlineChart);
        $(document).bind("kendo:skinChange", barlineChart);