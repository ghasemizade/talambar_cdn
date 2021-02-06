function chart_cms_files()
{
  if($("#chartdivcmsfiles").length == 1){highChartcmsfiles();}
  if($("#chartdivcmsfilessize").length == 1){highChartcmsfilessize();}
}





function highChartcmsfiles()
{

  Highcharts.chart('chartdivcmsfiles', {
    chart: {
      type: 'pie'
    },
    title: {
      text: $("#charttitle").html(),
    },
    tooltip: {
      shared: true,
    },
    series: [{
        name: $('#charttitleunit').html(),
        colorByPoint: true,
        data: $.parseJSON($("#chartdata").html())
    }]
  });
}



function highChartcmsfilessize()
{

  Highcharts.chart('chartdivcmsfilessize', {
    chart: {
      type: 'pie'
    },
    title: {
      text: $("#charttitlesize").html(),
    },
    tooltip: {
      shared: true,
    },
    series: [{
        name: $('#charttitleunitsize').html(),
        colorByPoint: true,
        data: $.parseJSON($("#chartdatasize").html())
    }]
  });
}
