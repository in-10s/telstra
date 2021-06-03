 function createChart2() {
            $("#chart2").kendoChart({
               
                legend: {
                    position: "bottom"
                },
                series: [{
                    type: "line",
                    data: [6, 10, 10, 10, 10, 9, 5, 5, 10, 8, 8, 8],
                    color: "#ff1c1c",
                    axis: "temp"
                }, {
                    type: "line",
                    data: [-5, -6, 0, -4, -3, -5.2, -5, -1.7, -1, 0],
                    color: "#ffae00",
                    axis: "temp"
                }, {
                    type: "area",
                    data: [16.4, 21.7, 35.4, 19, 10.9, 13.6, 10.9, 10.9],                  
                    color: "#73c100",
                    axis: "wind"
                }, {
                    type: "area",
                    data: [5.4, 2, 5.4, 3, 2, 1, 3.2, 7.4, 0, 8.2, 0, 1.8],                   
                    color: "#007eff",
                    axis: "rain"
                }],
                valueAxes: [{
                    name: "rain",
                    color: "#007eff",
                    min: 0,
                    max: 60
                }, {
                    name: "wind",
                    color: "#73c100",
                    min: 0,
                    max: 60
                }, {
                    name: "temp",
                    min: -30,
                    max: 30
                }],
                categoryAxis: {
                    categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
                    // Align the first two value axes to the left
                    // and the last two to the right.
                    //
                    // Right alignment is done by specifying a
                    // crossing value greater than or equal to
                    // the number of categories.
                    axisCrossingValues: [32, 32, 0],
                    justified: true
                },
                tooltip: {
                    visible: false,
                    format: "{0}",
                    template: "#= category #/03: #= value #"
                }
            });
        }

        $(document).ready(createChart2);
        $(document).bind("kendo:skinChange", createChart2);