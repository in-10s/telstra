  function createGauge(labelPosition) {
                    $("#gauge").kendoRadialGauge({

                        pointer: {
                            value: 65
                        },

                        scale: {
                            minorUnit: 5,
                            startAngle: -30,
                            endAngle: 210,
                            max: 100,
                           labels: {
                // labels template
                template: "#= value #%"

            },
                            ranges: [
									 {
                                    from: 0,
                                    to: 50,
                                    color: "#27ae60"
                                },{
                                    from: 50,
                                    to: 70,
                                    color: "#ffc700"
                                }, {
                                    from: 70,
                                    to: 90,
                                    color: "#ff7a00"
                                }, {
                                    from: 90,
                                    to: 100,
                                    color: "#c20000"
                                }
                            ]
                        }
                    });
                }

                $(document).ready(function() {
                    createGauge();

                    $(".box").bind("change", refresh);

                    $(document).bind("kendo:skinChange", function(e) {
                        createGauge();
                    });

                    window.configuredRanges = $("#gauge").data("kendoRadialGauge").options.scale.ranges;
                });

                function refresh() {
                    var gauge = $("#gauge").data("kendoRadialGauge"),
                        showLabels = $("#labels").prop("checked"),
                        showRanges = $("#ranges").prop("checked"),
                        positionInputs = $("input[name='labels-position']"),
                        labelsPosition = positionInputs.filter(":checked").val(),
                        options = gauge.options;

                    options.transitions = false;
                    options.scale.labels.visible = showLabels;
                    options.scale.labels.position = labelsPosition;
                    options.scale.ranges = showRanges ? window.configuredRanges : [];

                    gauge.redraw();
                }