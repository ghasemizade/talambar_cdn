
function fileLoader(_url, _fn)
{
  console.log('load file ', _url);
  if(!_url)
  {
    return false;
  }

  var $scriptExist = $('script[src="' + _url + '"]');

  if(!$scriptExist.length)
  {
    console.log('load file - new ' + _url);
    var newScript = document.createElement("script");
    // append to page js section
    $('.js').append(newScript);

    if(_fn)
    {
      console.log('load file - fn ' + _fn);
      // add on load function
      newScript.onload = function()
      {
        if(_fn === true)
        {
          _fn = 'pageScript';
        }
        console.log('load fn on bug ' + _fn );
        callFunc(_fn, 'fileLoader');
      };
    }

    // show error message if we are problem on load process
    newScript.onerror = function(){ console.log('error or load script ' + _url);};

    // set source of file
    newScript.src = _url;
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
