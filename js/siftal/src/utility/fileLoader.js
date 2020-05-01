
function fileLoader(_url, _fn, _forceCallFn)
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
    $('.js [data-pagescript]').attr('data-pagescript', null);
    fileLoader(myScriptURL, true);
  }
}


function loc(_page, _in, _env)
{
  var $body    = $('body');
  var bodyPage = $body.attr('data-page');
  var bodyIn   = $body.attr('data-in');
  var bodyEnv  = $body.attr('data-env');
  var result;

  if(_page)
  {
    if(_page === bodyPage)
    {
      result = true;
    }
    else
    {
      return false;
    }
  }

  if(_in)
  {
    if(_in === bodyIn)
    {
      result = true;
    }
    else
    {
      return false;
    }
  }

  if(_env)
  {
    if(_env === bodyEnv)
    {
      result = true;
    }
    else
    {
      return false;
    }
  }

  if(result === true)
  {
    return true;
  }
}
