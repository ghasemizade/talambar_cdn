

function readPageAllScripts(_page, _chart)
{
  var force = null;
  if(_page || _chart)
  {
    // from pushState, force call fn
    force = true;
  }
  // run each script if exist
  readPageScript(_page, force);
  readPageChart(_chart, force);
}


function readPageScript(_url, _force)
{
  var myScriptURL;
  if(_url)
  {
    myScriptURL = _url;
  }
  else
  {
    myScriptURL = $('.js [data-pagescript]').attr('data-pagescript');
    $('.js [data-pagescript]').remove();
  }

  if(myScriptURL)
  {
    myScriptURL = urlJibres('cdn') + "js/page/" + myScriptURL;
    fileLoader(myScriptURL, 'pageScript', _force);
  }
}


function readPageChart(_url, _force)
{
  var myChartURL;
  if(_url)
  {
  }
  else
  {
    myChartURL = $('.js [data-script-chart]').attr('data-script-chart');
    $('.js [data-script-chart]').remove();
  }

  if(myChartURL)
  {
    myChartURL = urlJibres('cdn') + "js/chart/" + myChartURL;
    var highChartUrl = urlJibres('cdn') + 'highcharts/highcharts-8.0.4.js';
    fileLoader(highChartUrl, myChartURL, _force);
  }
}




function fileLoader(_url, _nextAction, _forceCallFn)
{
  console.log(_url);
  console.log(_nextAction);
  if(!_url)
  {
    return false;
  }

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

  if(_fn)
  {
    callFunc(_fn, _fnParam);
  }
}


