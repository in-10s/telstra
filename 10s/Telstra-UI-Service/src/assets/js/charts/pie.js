 function createChart() {
            $("#chart").kendoChart({
                title: {
                    text: "Here is a snapshot of how you are using your ntel connection"
                },
                legend: {
                   position: "bottom"
                },
                seriesDefaults: {
                    labels: {
                        template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                        position: "outsideEnd",
                        visible: true,
                        background: "transparent"
                    }
                },
                series: [{
                    type: "pie",
                    data: [{
                        category: "Voice",
                        value: 45
                    }, {
                        category: "Data",
                        value: 25
                    }, {
                        category: "SMS",
                        value: 20
                    },  {
                        category: "Vas",
                        value: 10
                    }]
                }],
                tooltip: {
                    visible: true,
                    template: "#= category # - #= kendo.format('{0:P}', percentage) #"
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