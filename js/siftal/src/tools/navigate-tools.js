
function analyseAjaxResponse(_data, _deferred, _props)
{
  var json;
  var html;

  if(typeof _data === 'object')
  {
    // it's json
    json = _data;
  }
  else
  {
    var jsonExpected = _data[0] === '{';
    if(jsonExpected)
    {
      try
      {
        var n = _data.indexOf('\n');
        n     = n === -1 ? undefined : n;
        json  = JSON.parse(_data.slice(0, n));
        // get html
        html = res.slice(n);
        _.extend(json, {html: html});
      }
      catch(e)
      {
        if (jsonExpected)
        {
          notif('error', 'There was an error in parsing JSON!');
        }
        _deferred.reject();
        if(_props.url)
        {
          location.replace(_props.url);
        }
        return null;
      }
    }
  }


  if(json && json.debug)
  {
    notifGenerator(json.debug);
  }

  return json;
}


function analyseAjaxRedirect(_result)
{
 // redirect it's okay and we have redirect
  if(_result.ok === true && _result.redirect)
  {
    if(_result.replaceState)
    {
      Navigate(
      {
        url: _result.redirect,
        replace: true
      });
      return true;
    }
    else
    {
      Navigate(
      {
        url: _result.redirect
      });
      return true;
    }
  }
  return false;
}

