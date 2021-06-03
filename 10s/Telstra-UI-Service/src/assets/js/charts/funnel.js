 function createChart() {
            $("#chart").kendoChart({
              
                legend: {
                    position: "bottom"
                },
                seriesDefaults: {
                    dynamicHeight: false,
                    labels: {
                        template: "#= category #",
                        visible: true,
                        font: "15px sans-serif",
                        align: "center",
                        position: "center",
                        background: "transparent",
                        color: "#000",
                        padding: 5,
                        border: {
                            width: 1,
                            dashType: "dot",
                            color: "#000"
                        },
                        format: "N0"
                    }
                },
                series: [{
                    type: "funnel",
                    data: [ {
                        category: "Mobility",
                        value: 3
                    }, {
                        category: "Fixed line",
                        value: 2
                    }, {
                        category: "Broadband",
                        value: 1
                    }]
                }],
                tooltip: {
                    visible: true,
                    template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                }
            });
        }

        $(document).ready(function () {
            createChart();
            $('#sizeSlider').kendoSlider({
                change: refresh,
                min: 1,
                max: 40,
                showButtons: false
            });
            $('#color').kendoColorPicker({ change: refresh, value: "#fff", buttons: false });
            $(".box").on("change", ":checkbox,:radio", refresh);

            $(document).bind("kendo:skinChange", createChart);
        });

        function refresh() {
            var chart = $("#chart").data("kendoChart"),
                slider = $('#sizeSlider').data("kendoSlider"),
                colorPicker = $('#color').data("kendoColorPicker"),
                showBorder = $('#showBorder').is(':checked'),
                funnelSeries = chart.options.series[0],
                labepOptions = funnelSeries.labels,
                labels = $("#labels").prop("checked"),
                alignInputs = $("input[name='alignType']"),
                alignLabels = alignInputs.filter(":checked").val(),
                positionInputs = $("input[name='positionType']"),
                position = positionInputs.filter(":checked").val();

            var borderOptions = showBorder ? {
                    width: 1,
                    dashType: "dot",
                    color: "#000"
                } : {
                    width:0
                };

            var seriesOptions = {
                dynamicHeight: false,
                labels: {
                    template: "#= category #",
                    visible: labels,
                    font: slider.value() + "px sans-serif",
                    align: alignLabels,
                    position:position,
                    background: "transparent",
                    color: colorPicker.value(),
                    padding: 5,
                    border: borderOptions,
                    format: "N0"
                }
            }

            $('#showBorder').attr("disabled", !labels);
            alignInputs.attr("disabled", !labels);
            positionInputs.attr("disabled",!labels);
            slider.enable(labels);
            colorPicker.enable(labels);

            chart.setOptions({
                seriesDefaults: seriesOptions,
                transitions : false
            })
        }