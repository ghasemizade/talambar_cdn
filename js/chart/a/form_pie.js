function chart_a_form_pie()
{
  if($("#chartdivpie").length == 1){highChart();}
}




function highChart()
{

 Highcharts.chart('chartdivpie', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: $('#chartitemtitle').html()
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f}'
            }
        }
    },
    series: [{
        name: $('#chartitemtitle').html(),
        colorByPoint: true,
        data: $.parseJSON($("#chartdata").text())
    }]
});
}