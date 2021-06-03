 function createChart() {
            $("#chart").kendoChart({
               
                legend: {  
                   position: "bottom"
                },
                seriesDefaults: {
                    labels: {
                        template: "#= kendo.format('{0:P}', percentage)#",
                        position: "outsideEnd",
                        visible: true,
                        background: "transparent"
                    }
                },
                series: [{
                    type: "pie",
                    data: [{
                        category: "Mobile",
                        value: 45
                    }, {
                        category: "Fixed line",
                        value: 30
                    }, {
                        category: "Broadband",
                        value: 25
                    }]
                }],
                tooltip: {
                    visible: true,
                    template: "#= category # : #= kendo.format('{0:P}', percentage) #"
                }
            });
        }

        $(document).ready(function() {
            createChart();
            $(document).bind("kendo:skinChange", createChart);
            $(".box").bind("change", refresh);
        });

        function refresh() {
            var chart = $("#chart").data("kendoChart"),
                pieSeries = chart.options.series[0],
                labels = $("#labels").prop("checked"),
                alignInputs = $("input[name='alignType']"),
                alignLabels = alignInputs.filter(":checked").val();

            chart.options.transitions = false;
            pieSeries.labels.visible = labels;
            pieSeries.labels.align = alignLabels;

            alignInputs.attr("disabled", !labels);

            chart.refresh();
        }