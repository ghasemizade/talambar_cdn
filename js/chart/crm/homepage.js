function chart_crm_homepage()
{
  if($("#chartdivcrmhome").length == 1){highChartcrmhome();}
}






function highChartcrmhome()
{

Highcharts.chart('chartdivcrmhome', {
  chart: {
    type: 'areaspline'
  },
  title: {
    text: $("#charttitleunit").html(),
  },
  xAxis: {
    categories: $.parseJSON($("#chartcategory").html()),
    tickmarkPlacement: 'on',
    title: {
      enabled: false
    }
  },
  yAxis: {
    title: {
      text: $("#charttitleunit").html()
    }
  },
  tooltip: {
    split: true
  },
  plotOptions: {
    area: {
      stacking: 'normal',
      lineColor: '#666666',
      lineWidth: 1,
      marker: {
        lineWidth: 1,
        lineColor: '#666666'
      }
    }
  },
  series: [
  {
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

