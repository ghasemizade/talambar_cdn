function chart_crm_tickets()
{
  if($("#chartdivcmsticket").length == 1){highChartcmsTicket();}
}






function highChartcmsTicket()
{

  Highcharts.chart('chartdivcmsticket', {
    chart: {
      type: 'column'
    },
    title: {
      text: $("#charttitle").html(),
    },
    xAxis: {
      categories: $.parseJSON($("#chartcategory").html())
    },
    yAxis: {
      min: 0,
      title: {
        text: false
      }
    },
    tooltip: {
      shared: true,
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        // dataLabels: {
        //   enabled: true
        // }
      }
    },
    series: [
        {
          name: $("#charttickettitle").html(),
          color: 'rgba(139,195,75,1)',
          data: $.parseJSON($("#chartdataticket").html())
        },
        {
          name: $("#chartmessagetitle").html(),
          color: 'rgba(126,86,134,.9)',
          data: $.parseJSON($("#chartdatamessage").html())
        }

    ]
  });
}
