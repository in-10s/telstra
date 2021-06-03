  // Get the elements where we will attach the charts
            var chartClassic    = $('#chart-classic');
      

            // Data for the charts
		var dataEarnings    = [[1, 1900], [2, 2300], [3, 3200], [4, 2500], [5, 4200], [6, 3100]];
		var dataSales       = [[1, 850], [2, 750], [3, 1500], [4, 900], [5, 1500], [6, 1150]];
		var dataTickets     = [[1, 130], [2, 330], [3, 220], [4, 350], [5, 150], [6, 275]];

	var dataSalesBefore = [[1, 200], [4, 350], [7, 700], [10, 950], [13, 800], [16, 1050]];
	var dataSalesAfter  = [[2, 450], [5, 700], [8, 980], [11, 1200], [14, 1350], [17, 1200]];

	var dataMonths = [[1, 'Muscat'], [2, 'Muhafazat'], [3, 'Salalah'], [4, 'Muscat'], [5, 'Muhafazat'], [6, 'Salalah']];
		var dataMonthsBars  = [[2, 'Muscat'], [5, 'Muhafazat'], [8, 'Salalah'], [11, 'Muscat'], [14, 'Muhafazat'], [17, 'Salalah']];

            // Classic Chart
            $.plot(chartClassic,
                [
                    {
                        label: 'Mobile',
                        data: dataEarnings,
                        lines: {show: true, fill: true, fillColor: {colors: [{opacity: .6}, {opacity: .6}]}},
                        points: {show: true, radius: 5}
                    },
                    {
                        label: 'Fixed line',
                        data: dataSales,
                        lines: {show: true, fill: true, fillColor: {colors: [{opacity: .2}, {opacity: .2}]}},
                        points: {show: true, radius: 5}
                    },
                    {
                        label: 'Broadband',
                        data: dataTickets,
                        lines: {show: true, fill: true, fillColor: {colors: [{opacity: .2}, {opacity: .2}]}},
                        points: {show: true, radius: 5}
                    }
                ],
                {
                    colors: ['#8686df', '#71007a', '#d6d6f3'],
                    legend: {show: true, position: 'nw', backgroundOpacity: 0},
                    grid: {borderWidth: 0, hoverable: true, clickable: true},
                    yaxis: {tickColor: '#f5f5f5', ticks: 3},
                    xaxis: {ticks: dataMonths, tickColor: '#f5f5f5'}
                }
            );

            // Creating and attaching a tooltip to the classic chart
            var previousPoint = null, ttlabel = null;
            chartClassic.bind('plothover', function(event, pos, item) {

                if (item) {
                    if (previousPoint !== item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $('#chart-tooltip').remove();
                        var x = item.datapoint[0], y = item.datapoint[1];

                        if (item.seriesIndex === 0) {
                            ttlabel = '$ <strong>' + y + '</strong>';
                        } else if (item.seriesIndex === 1) {
                            ttlabel = '<strong>' + y + '</strong> sales';
                        } else {
                            ttlabel = '<strong>' + y + '</strong> tickets';
                        }

                        $('<div id="chart-tooltip" class="chart-tooltip">' + ttlabel + '</div>')
                            .css({top: item.pageY - 45, left: item.pageX + 5}).appendTo("body").show();
                    }
                }
                else {
                    $('#chart-tooltip').remove();
                    previousPoint = null;
                }
            });
