
        function createChart1() {
            $("#dchart").kendoChart({
               // title: {
			  // text: "Total Ticket Raised - 16"
			// },
                legend: {
                   position: "right"
                },
                seriesDefaults: {
                    labels: {
                        template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                        position: "insideEnd",
                        visible: false,
                        background: "transparent"
                    }
                },
                series: [{overlay: {gradient: "none"},
                    type: "donut",
                    data: [{
                        category: "Mobile",
                        value: 25
                    }, {
                        category: "Connectivity & Fixed Voice",
                        value: 30
                    }, 
					 {
                        category: "Network & Managed cloud",
                        value: 45
                    }]
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
