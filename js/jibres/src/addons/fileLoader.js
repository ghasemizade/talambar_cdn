

function readPageAllScripts(_force, _page)
{
  // run each script if exist
  readPageScript(_force, _page);
  readPageChart();
  readPageEditor();
  readDigikalaCrawler();
  readPageSortable();
  readPageCropper();
  readPageFancyBox();
  readPageJsTree();
  readPageSlick();
  readPageSelect2();
  readPageUploader();

  loadThirdPartyScripts();
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
    var highChartUrl = urlJibres('cdn') + 'lib/highcharts/highcharts-8.2.0.js?v=3';
    myChartURL       = urlJibres('cdn') + "js/chart/" + myChartURL + '.js?v=3';

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
  var myEl = $('.txt[data-editor]');

  if(myEl && myEl.length > 0)
  {
    myUrl = urlJibres('cdn') + "js/ckeditor5/ckeditor.js?v=1";
    fileLoader(myUrl, 'runEditor', true);
  }
}


function readDigikalaCrawler()
{
  var myEl = $('[data-digikala-crawl]');

  if(myEl && myEl.length > 0)
  {
    myUrl = urlJibres('cdn') + "lib/digikalaCrawlMaster/digikalaCrawlMaster.js?v=4";
    fileLoader(myUrl, 'runDigiKalaCrawlMaster', true);
  }
}


function readPageSortable()
{
  var myEl = $('[data-sortable]');

  if(myEl && myEl.length > 0)
  {
    // load script
    myUrl = urlJibres('cdn') + "lib/sortable/sortable-1.13.0.min.js?v=3";
    fileLoader(myUrl, 'runSortable', true);
  }
}


function readPageCropper()
{
  var myEl = $('[data-cropper]');

  if(myEl && myEl.length > 0)
  {
    // load style
    StyleLoader(urlJibres('cdn') + "css/lib/cropperjs-2.0.0.css?v=2");
    myUrl = urlJibres('cdn') + "js/cropperjs/cropper-2.0.0.min.js?v=2";
    fileLoader(myUrl, 'runCropper', true);
  }
}


function readPageFancyBox()
{
  var myEl = $('[data-fancybox]');

  if(myEl && myEl.length > 0)
  {
    // load script
    StyleLoader(urlJibres('cdn') + "css/lib/jquery.fancybox-3.5.7.min.css?v=1");
    myUrl = urlJibres('cdn') + "js/fancybox/jquery.fancybox-3.5.7.min.js?v=1";
    fileLoader(myUrl, 'runFancybox', true);
  }
}


function readPageJsTree()
{
  var myEl = $('[data-jstree]');

  if(myEl && myEl.length > 0)
  {
    // load script
    StyleLoader(urlJibres('cdn') + "lib/jstree/jstree-3.3.10.css?v=1");
    myUrl = urlJibres('cdn') + "lib/jstree/jstree-3.3.10.min.js?v=1";
    fileLoader(myUrl, 'runJstree', true);
  }
}


function readPageSlick()
{
  var myEl = $('[data-slider]');

  if(myEl && myEl.length > 0)
  {
    // load script
    myUrl = urlJibres('cdn') + "js/slick/slick-1.8.1.min.js?v=2";
    fileLoader(myUrl, 'runPageSlider', true);
  }
}


function readPageSelect2()
{
  var myEl = $('.select22');

  if(myEl && myEl.length > 0)
  {
    // load script
    myUrl = urlJibres('cdn') + "js/select2/select2.full-v4.0.13.js?v=3";
    fileLoader(myUrl, 'runPageSelect2', true);
  }
}


function readPageUploader()
{
  var myEl = $('[data-uploader]');

  if(myEl && myEl.length > 0)
  {
    // load style
    // StyleLoader(urlJibres('cdn') + "css/lib/uploader-1-min.css");
    // load script
    myUrl = urlJibres('cdn') + "js/uploader/uploader-1-min.js?v=1";
    fileLoader(myUrl, 'runUploader', true);
  }
}


function fileLoader(_url, _fn, _forceCallFn, _file, _scriptType)
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
    if(_scriptType === undefined)
    {
     _scriptType = 'async';
    }
    var newScript = document.createElement("script");
    if(_scriptType === 'defer')
    {
      newScript.defer = true;
    }
    if(_scriptType === 'async')
    {
      newScript.async = true;
    }
    if(_scriptType === 'async utf8 crossorigin')
    {
      newScript.async = true;
      newScript.charset='UTF-8';
      newScript.setAttribute('crossorigin','*');
    }
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
    var newStyle = document.createElement("link");
    // append to page js section
    $('.js').append(newStyle);

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


