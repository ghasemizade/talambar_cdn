

function unlockFormLoadingPage()
{
  $('body').attr('data-loading-form', null);
}


function unlockForm(_locked, _data)
{
  var unlockAll = true;
  if(_data && _data.msg && _data.msg[0] && _data.msg[0]['meta'] && _data.msg[0]['meta']['unlock'] === false)
  {
    unlockAll = false;
  }

  if(unlockAll && _locked)
  {
    $('input, button, textarea, [contenteditable], [data-ajaxify]').prop('disabled', false);
  }
  unlockFormLoadingPage();
  $('.submitedForm').removeClass('submitedForm');
  callFunc('loading_form', false);
}


function unlockFormRedirect(_data, _autoScrollAttr)
{
  if(_data && _data.redirect)
  {
    var autoScroll = true;
    if(_autoScrollAttr)
    {
      autoScroll = _autoScrollAttr;
    }

    var a = $('<a href="' + _data.redirect + '"></a>');
    if(a.isAbsoluteURL() || _data.direct)
    {
      location.replace(_data.redirect);
    }
    else
    {
      if(_data.replaceState)
      {
        if(_data.replaceState === 'top')
        {
          autoScroll = true;
        }
        else if(_data.replaceState)
        {
          autoScroll = false;
        }
        Navigate({
          url: _data.redirect,
          autoScroll: autoScroll,
          replace: true
        });
      }
      else
      {
        Navigate({
          url: _data.redirect,
          autoScroll: autoScroll
        });
      }
    }
    return;
  }
}

