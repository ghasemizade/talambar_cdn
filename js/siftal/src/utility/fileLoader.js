
function fileLoader(_source)
{
  console.log('load file');
  console.log(_source);
  var _src = _source.url;
  if(!_src)
  {
    return false;
  }

  var $scriptExist = $('script[src="' + _src + '"]');

  if(!$scriptExist.length)
  {
    console.log('load file - new ' + _src);
    var newScript = document.createElement("script");
    // append to page js section
    $('.js').append(newScript);

    if(_source.fn)
    {
      console.log('load file - fn ' + _source.fn);
      // add on load function
      newScript.onload = function()
      {
        console.log('load fn ' + _source.fn );
        callFunc(_source.fn, 'fileLoader');
      };
    }

    // show error message if we are problem on load process
    newScript.onerror = function(){ console.log('error or load script ' + _src);};

    // set source of file
    newScript.src = _src;
  }
}

