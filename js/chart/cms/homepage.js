function chart_cms_homepage()
{
  if($("#chartdivcmshome").length == 1){highChartcmshome();}
}






function highChartcmshome()
{

  Highcharts.chart('chartdivcmshome', {
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
        text: $("#charttitleunit").html()
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
          name: $("#chardatatitle").html(),
          color: 'rgba(139,195,75,1)',
          data: $.parseJSON($("#chartdata").html())
        }
    ]
  });
}
