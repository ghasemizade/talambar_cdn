function chart_crm_homepage()
{
  if($("#chartdivcrmhome").length == 1){highChartcrmhome();}
}






function highChartcrmhome()
{

  Highcharts.chart('chartdivcrmhome', {
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
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: ( // theme
            Highcharts.defaultOptions.title.style &&
            Highcharts.defaultOptions.title.style.color
          ) || 'gray'
        }
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
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
    {
          name: $("#chartverifytitle").html(),
          color: 'rgba(139,195,75,1)',
          data: $.parseJSON($("#chartverify").html())
        },
        {
          name: $("#chartunverifytitle").html(),
          color: 'rgba(126,86,134,.9)',
          data: $.parseJSON($("#chartunverify").html())
        }
    ]
  });
}

