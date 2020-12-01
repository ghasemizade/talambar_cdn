function chart_crm_homepage()
{
  if($("#chartdiv").length == 1){highChart();}
}




function highChart()
{

  Highcharts.chart('chartdiv',
  {
    chart: {
      type: 'areaspline',
      zoomType: 'x',
    },
    title: {
      text: $("#charttitle").html()
    },
    xAxis: [{
      categories: $.parseJSON($("#chartcategory").html()),
      crosshair: true
    }],
    yAxis: [{ // Primary yAxis
      labels: {
        format: '{value}',
      }
    },
    { // Secondary yAxis
      title: {
        text: $("#charttitleunit").html(),
      },
      labels: {
        format: '{value}',
      },
      opposite: true
    }],
    legend: {
      layout: 'vertical',
      align: 'left',
      x: 120,
      verticalAlign: 'top',
      y: 50,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
    },
      series: [{
        name: $("#chartverifytitle").html(),
        data: $.parseJSON($("#chartverify").html())
      },
      {
        name: $("#chartunverifytitle").html(),
        data: $.parseJSON($("#chartunverify").html())
      }
      ]
  });
}

