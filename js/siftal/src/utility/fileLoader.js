
function fileLoader(_url, _type, _fn, _forceCallFn)
{
  if(!_url)
  {
    return false;
  }
  // fix fn name
  if(_fn === true)
  {
    _fn = 'pageScript';
  }

  _url = urlJibres('cdn') + "js/" + _type + "/" + _url;
  console.log(_url);

  var $scriptExist = $('script[src="' + _url + '"]');

  if(!$scriptExist.length)
  {
    _forceCallFn = false;
    var newScript = document.createElement("script");
    // append to page js section
    $('.js').append(newScript);

    if(_fn)
    {
      // add on load function
      newScript.onload = function()
      {
        callFunc(_fn, 'fileLoader');
      };
    }

    // show error message if we are problem on load process
    newScript.onerror = function(){ console.warn('error or load script ' + _url);};

    // set source of file
    newScript.src = _url;
  }

  if(_forceCallFn)
  {
    callFunc(_fn, 'fileLoaderForce');
  }
}


function readScript(_url, _fn)
{
  var myScriptURL = $('.js [data-pagescript]').attr('data-pagescript');
  if(myScriptURL)
  {
    $('.js [data-pagescript]').remove();
    fileLoader(myScriptURL, 'page', true);
  }
  readChart();
}


function readChart()
{
  var myChartURL = $('.js [data-script-chart]').attr('data-script-chart');
  if(myChartURL)
  {
    $('.js [data-script-chart]').remove();
    fileLoader(myChartURL, 'chart' , true);
  }
}

