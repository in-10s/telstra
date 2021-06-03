function createGauge() {
                    $("#gauge").kendoRadialGauge({							
              			 
                        pointer: [{
                            value: 5,
                            color: "#c20000",
                            cap: { size: 0.15 }
                        }, {
                            value: 25,
                            color: "#ff7a00",
                            cap: { size: 0.1 }
                        }, {
                            value: 87,
                            color: "#4caf50"
                        }],
						
                        scale: {
                            minorUnit: 5,
                            startAngle: -30,
                            endAngle: 210,
                            max: 100
                        },
						 tooltip: {
                    visible: true,
                    template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                }
                    });
                }

                $(document).ready(function () {
                    createGauge();

                    $("#example .slider").each(function () {
                        $(this).kendoSlider({
                            min: 0,
                            max: 180,
                            showButtons: true,
                            change: function () {
                                var id = this.element.attr("id");
                                var pointerIndex = id.substr(id.length - 1);
                                var gauge = $("#gauge").data("kendoRadialGauge");
                                gauge.pointers[pointerIndex].value(this.value());
                            }
                        });
                    });

                    $("#getValues").click(function () {
                        alert("All values: " + $("#gauge").data("kendoRadialGauge").allValues().join(", "));
                    });

                    $("#setValues").click(function () {
                        var values = $("#newValues").val().split(",");

                        values = $.map(values, function (val) {
                            return parseInt(val);
                        });

                        $("#gauge").data("kendoRadialGauge").allValues(values);
                    });

                    $(document).bind("kendo:skinChange", function (e) {
                        createGauge();
                    });
                });