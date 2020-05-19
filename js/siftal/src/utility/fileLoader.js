

function readPageAllScripts(_force, _page)
{
  // run each script if exist
  readPageScript(_force, _page);
  readPageChart();
  readPageEditor();
  readPageSortable();
  readPageCropper();
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


function readPageSortable()
{
  var mySortable = $('[data-sortable]');

  if(mySortable && mySortable.length > 0)
  {
    // load script
    mySortableURL = urlJibres('cdn') + "js/sortable/sortable-1.10.2.min.js";
    fileLoader(mySortableURL, 'runSortable', true);
  }
}


function readPageCropper()
{
  var myCropper = $('[data-cropper]');

  if(myCropper && myCropper.length > 0)
  {
    // load style
    StyleLoader(urlJibres('cdn') + "css/lib/cropperjs-2.0.0.css");
    myCropperURL = urlJibres('cdn') + "js/cropperjs/cropper-2.0.0.min.js";
    fileLoader(myCropperURL, 'runCropper', true);
  }
}


function fileLoader(_url, _fn, _forceCallFn, _file)
{
  if(!_url)
  {
    return false;
  }

  if($('script[src="' + _url + '"]').length)
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


function StyleLoader(_url)
{
  console.log('style loader ' + _url);
  if(!_url)
  {
    return false;
  }

  if($('link[href="' + _url + '"]').length)
  {
    // do nothing
  }
  else
  {
    console.log('add style');
    var newStyle = document.createElement("link");
    // append to page js section
    $('.js').append(newStyle);
    // add on load function
    newStyle.onload = function()
    {
      console.warn('load style successfuly ' + _url);
    };
    // show error message if we are problem on load process
    newStyle.onerror = function(){ console.warn('error or load style ' + _url);};

    // set source of file
    newStyle.rel = "stylesheet";
    newStyle.href = _url;
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


