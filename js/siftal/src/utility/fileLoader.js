

function readPageAllScripts(_force, _page)
{
  // run each script if exist
  readPageScript(_force, _page);
  readPageChart();
  readPageEditor();
}


function readPageScript(_force, _url)
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

  if(myScriptURL && myScriptURL.length > 0)
  {
    myScriptURL = urlJibres('cdn') + "js/page/" + myScriptURL;
    fileLoader(myScriptURL, 'pageScript', _force);
  }
}


function readPageChart()
{
  var myChartURL = $('.chart[data-abc]').attr('data-abc');

  if(myChartURL && myChartURL.length > 0)
  {
    var fnName       = myChartURL;
    var highChartUrl = urlJibres('cdn') + 'js/highcharts/highcharts-8.0.4.js';
    myChartURL       = urlJibres('cdn') + "js/chart/" + myChartURL + '.js';

    fnName = fnName.replace('/', '_');
    if(fnName)
    {
      fnName = 'chart_' + fnName;
    }

    fileLoader(highChartUrl, fnName, true, myChartURL);
  }
}


function readPageEditor()
{
  var myEditors = $('.txt[data-editor]');

  if(myEditors && myEditors.length > 0)
  {
    myEditorURL = urlJibres('cdn') + "js/ckeditor5/ckeditor.js";
    fileLoader(myEditorURL, 'runEditor', true);
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


