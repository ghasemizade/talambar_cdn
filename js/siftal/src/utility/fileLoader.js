
function fileLoader(_src, _fn)
{
  var $scriptExist = $('script[src="' + _src + '"]');

  if(!$scriptExist.length)
  {
    var newScript = document.createElement("script");
    // append to page js section
    $('.js').append(newScript);

    // add on load function
    newScript.onload = function()
    {
      console.log('load fn ' + _fn );
      callFunc(_fn, 'fileLoader');
    };

    // show error message if we are problem on load process
    newScript.onerror = function(){ console.log('error or load script ' + _src);};

    // set source of file
    newScript.src = _src;
  }
}

