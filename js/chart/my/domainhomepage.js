function myChart()
{

  if($("#chartdiv").length == 1){chartdiv();}

}

$(document).ready(function(){
  myChart();
});










function chartdiv()
{

  Highcharts.chart('chartdiv',
  {
    title: { text: $("#charttitle").text() },
    xAxis: [{
      categories: $.parseJSON($("#chartcategory").text()),
      crosshair: true
    }],
    yAxis: [{ title: false }],
    series:
    [
      {
        name: $("#charttitlepayed").text(),
        data: $.parseJSON($("#chartprice").text()),
        type: 'column',
        showInLegend: false,
        tooltip: {
          valueSuffix: ' ' + $("#charttitleprice").text()
        }
      }
    ]
  });
}



