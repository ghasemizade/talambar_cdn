
function fileLoader(_url, _type, _nextAction, _forceCallFn)
{
  console.log(_url);
  console.log(_type);
  console.log(_nextAction);
  if(!_url || !_type)
  {
    return false;
  }

  _url = urlJibres('cdn') + "js/" + _type + "/" + _url;
  console.log(_url);

  var $scriptExist = $('script[src="' + _url + '"]');


  if($scriptExist.length)
  {
    if(_forceCallFn)
    {
      afterFileLoaded(_nextAction, 'fileLoaderForce');
    }
  }
  else
  {
    var newScript = document.createElement("script");
    // append to page js section
    $('.js').append(newScript);

    // add on load function
    newScript.onload = function()
    {
      afterFileLoaded(_nextAction, 'fileLoader');
    };

    // show error message if we are problem on load process
    newScript.onerror = function(){ console.warn('error or load script ' + _url);};

    // set source of file
    newScript.src = _url;
  }

}


function afterFileLoaded(_fn, _fnParam)
{
  console.log(_fn);

  if(urlCorrect(_fn))
  {
    console.log('is url');
    // load script of this chart
    fileLoader(_fn, 'charts', 'pageChart');
    return;
  }

  // fix fn name
  if(_fn === true)
  {
    _fn = 'pageScript';
  }

  if(_fn)
  {
    callFunc(_fn, _fnParam);
  }
}


function readScript(_url, _fn)
{
  var myScriptURL = $('.js [data-pagescript]').attr('data-pagescript');
  if(myScriptURL)
  {
    $('.js [data-pagescript]').remove();
    fileLoader(myScriptURL, 'page');
  }
  readChart();
}


function readChart()
{
  var myChartURL = $('.js [data-script-chart]').attr('data-script-chart');
  if(myChartURL)
  {
    var highChartUrl = 'highcharts-8.0.4.js';
    $('.js [data-script-chart]').remove();
    fileLoader(highChartUrl, 'highcharts', myChartURL);
  }
}

