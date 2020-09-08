
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

