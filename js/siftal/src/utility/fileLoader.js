

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
    myChartURL = _url;
  }
  else
  {
    myChartURL = $('.js [data-script-chart]').attr('data-script-chart');
    $('.js [data-script-chart]').remove();
  }

  if(myChartURL)
  {
    var fnName       = myChartURL;
    var highChartUrl = urlJibres('cdn') + 'js/highcharts/highcharts-8.0.4.js';
    myChartURL       = urlJibres('cdn') + "js/chart/" + myChartURL;
    fnName = fnName.replace('.js', '');
    fnName = fnName.replace('/', '_');
    // if(fnName.lastIndexOf('/'))
    // {
    //   fnName = fnName.substr(fnName.lastIndexOf('/') + 1);
    // }
    if(fnName)
    {
      fnName = 'chart_' + fnName;
    }
    fileLoader(highChartUrl, fnName, true, myChartURL);
  }
}


function fileLoader(_url, _fn, _forceCallFn, _file)
{
  if(!_url)
  {
    return false;
  }

  var $scriptExist = $('script[src="' + _url + '"]');

  if($scriptExist.length)
  {
    if(_forceCallFn)
    {
      afterFileLoaded(_fn, 'fileLoaderForce', _file);
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
      afterFileLoaded(_fn, 'fileLoader', _file);
    };

    // show error message if we are problem on load process
    newScript.onerror = function(){ console.warn('error or load script ' + _url);};

    // set source of file
    newScript.src = _url;
  }

}




function afterFileLoaded(_func, _param, _file)
{
  if(urlCorrect(_file))
  {
    // load script of this chart
    fileLoader(_file, _func, true);
    return;
  }

  if(_func)
  {
    callFunc(_func, _param);
  }
}


