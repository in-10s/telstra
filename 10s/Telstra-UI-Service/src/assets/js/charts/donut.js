
        function createChart1() {
            $("#dchart").kendoChart({
                title: {
                    text: "Total ticket raised - 16"
                },
                legend: {
                   position: "left"
                },
                seriesDefaults: {
                    labels: {
                        template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                        position: "insideEnd",
                        visible: false,
                        background: "transparent"
                    }
                },
                series: [{
                    type: "donut",
                    data: [{
                        category: "Pending 30%",
                        value: 35
                    }, {
                        category: "Resolved",
                        value: 65
                    }, ]
                }],
                tooltip: {
                    visible: true,
                    template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                }
            });
        }

        $(document).ready(function() {
            createChart1();
            $(document).bind("kendo:skinChange", createChart1);
            $(".box").bind("change", refresh);
        });

        function refresh() {
            var chart = $("#dchart").data("kendoChart"),
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
