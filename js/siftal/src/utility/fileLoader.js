
function fileLoader(_src)
{
  var $scriptExist = $('script[src="' + _src + '"]');

  if(!$scriptExist.length)
  {
    var newScript = document.createElement("script");
    $('.js').append(newScript);
    newScript.onload = function(){ console.log('load');};
    newScript.onerror = function(){ console.log('error');};
    newScript.src = _src;
  }
}

