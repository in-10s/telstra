  // Get the elements where we will attach the charts
            var chartClassic    = $('#chart-classic');
      

            // Data for the charts
		var dataEarnings    = [[1, 1900], [2, 2300], [3, 3200], [4, 2500], [5, 4200], [6, 3100], [7, 3600], [8, 2500], [9, 4600], [10, 3700], [11, 4200], [12, 5200]];
		var dataSales       = [[1, 850], [2, 750], [3, 1500], [4, 900], [5, 1500], [6, 1150], [7, 1500], [8, 900], [9, 1800], [10, 1700], [11, 1900], [12, 2550]];
		var dataTickets     = [[1, 130], [2, 330], [3, 220], [4, 350], [5, 150], [6, 275], [7, 280], [8, 380], [9, 120], [10, 330], [11, 190], [12, 410]];

	var dataSalesBefore = [[1, 200], [4, 350], [7, 700], [10, 950], [13, 800], [16, 1050], [19, 1200], [22, 750], [25, 980], [28, 1300], [31, 1350], [34, 1200]];
	var dataSalesAfter  = [[2, 450], [5, 700], [8, 980], [11, 1200], [14, 1350], [17, 1200], [20, 1530], [23, 1750], [26, 1300], [29, 1620], [32, 1750], [35, 1750]];

	var dataMonths = [[1, 'Jan'], [2, 'Feb'], [3, 'Mar'], [4, 'Apr'], [5, 'May'], [6, 'Jun'], [7, 'Jul'], [8, 'Aug'], [9, 'Sep'], [10, 'Oct'], [11, 'Nov'], [12, 'Dec']];
		var dataMonthsBars  = [[2, 'Jan'], [5, 'Feb'], [8, 'Mar'], [11, 'Apr'], [14, 'May'], [17, 'Jun'], [20, 'Jul'], [23, 'Aug'], [26, 'Sep'], [29, 'Oct'], [32, 'Nov'], [35, 'Dec']];

            // Classic Chart
            $.plot(chartClassic,
                [
                    {
                        label: 'Earnings',
                        data: dataEarnings,
                        lines: {show: true, fill: true, fillColor: {colors: [{opacity: .6}, {opacity: .6}]}},
                        points: {show: true, radius: 5}
                    },
                    {
                        label: 'Sales',
                        data: dataSales,
                        lines: {show: true, fill: true, fillColor: {colors: [{opacity: .2}, {opacity: .2}]}},
                        points: {show: true, radius: 5}
                    },
                    {
                        label: 'Tickets',
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
