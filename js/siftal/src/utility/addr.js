
function jibresURL(_type)
{
  if(!_type)
  {
    _type = 'sitelang';
  }
  var $addr = $('meta[name="jibres:' + _type + '"]');
  var myAddr = '';
  if($addr)
  {
    myAddr = $addr.attr('content');

  }
  return myAddr;
}


function urlStore()
{
  var myStore = urlStoreCode();

  if(myStore)
  {
    return jibresURL('sitelang') + myStore + '/';
  }

  return null;
}


function urlStoreAPI()
{
  var myStore = urlStoreCode();

  if(myStore)
  {
    return jibresURL('api') + myStore + '/v2/';
  }

  return null;
}


function urlStoreCode()
{
  var myEnv = urlEnv();
  if(myEnv === 'Jibres')
  {
    // in Jibres Env
  }
  else if(myEnv.charAt(0) === '$')
  {
    return myEnv;
  }

  return null;
}


function urlEnv()
{
  if($('body[data-env]') !== undefined)
  {
    var myEnv = $('body').attr('data-env');

    return myEnv;
  }

  return null;
}


function isAddr(_page, _in, _env)
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


