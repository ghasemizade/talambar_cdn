function chart_cms_files()
{
  if($("#chartdivcmsfiles").length == 1){highChartcmsfiles();}
}










function highChartcmsfiles()
{

  Highcharts.chart('chartdivcmsfiles', {
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
          name: $("#chartfiletitle").html(),
          color: 'rgba(100,180,220,1)',
          data: $.parseJSON($("#chartdata").html()),
          type: 'column'
        }

    ]
  });
}
