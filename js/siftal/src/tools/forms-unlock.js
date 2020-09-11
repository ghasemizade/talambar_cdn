

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
    return true;
  }
  return null;
}


function checkAutoClosePage(_autoClose, _timeout)
{
  // if need to autoClose tab on some special condition, close windows
  if(_autoClose)
  {
    var closeAfter = 0;
    if(_timeout)
    {
      closeAfter = _timeout;
    }
    notif('info', 'Auto close');
    setTimeout (function()
    {
      window.close();
    }, closeAfter);
  }
}


function analyseAjaxFormResponse(_data, _$this, _super, _autoScrollAttr)
{
  _super.results = _data;

  var notifResult = $.fn.ajaxify.showResults(_data, _$this, _super);
  console.log(notifResult);

  unlockFormLoadingPage();
  var redirectStatus = unlockFormRedirect(_data, _autoScrollAttr);
  console.log(222);
  console.log(_data);
  console.log(_autoScrollAttr);
  console.log(redirectStatus);
  if(redirectStatus === null)
  {
    // unlock form
    unlockForm(_super.lockForm, _data);

    if(_autoScrollAttr !== undefined)
    {
      findPushStateScroll();
    }
  }
}


function analyseAjaxFormError(_jqXHR, _textStatus, _errorThrown, _$this, _super, _autoScroll)
{
  if(_textStatus === 'timeout')
  {
    if(urlLangFa())
    {
      notif('fatal', 'مهلت درخواست  به پایان رسید', 'درخواست ناموفق', 5000, {'position':'topCenter', 'icon':'sf-history'});
    }
    else
    {
      notif('fatal', 'Failed from timeout', 'Request failed', 5000, {'position':'topCenter', 'icon':'sf-history'});
    }
    pingi();
  }
  else
  {
    if(_jqXHR)
    {

      if(_jqXHR.responseJSON)
      {
        // new way to show result
        if(_super)
        {
          _super.results = _jqXHR.responseJSON;
        }
        var notifResult = $.fn.ajaxify.showResults(_jqXHR.responseJSON, _$this, _super);

        unlockFormRedirect(_jqXHR, _autoScroll);

        if(notifResult === false)
        {
          if(urlLangFa())
          {
            notif('fatal', 'خطا در دریافت اطلاعات از سرور', 'درخواست ناموفق بود!');
          }
          else
          {
            notif('fatal', 'Error in detect server result', 'Ajax is failed!');
          }
        }
      }
      else
      {
        unlockFormRedirect(_jqXHR, _autoScroll);

        if(_jqXHR.status === 200 && !_jqXHR.responseText)
        {
          notif('info', 'Ok');
        }
        else
        {
          if(urlLangFa())
          {
            notif('fatal', 'نتیجه دریافتی از سرور نامعتبر است', 'درخواست ناموفق بود!');
          }
          else
          {
            notif('fatal', 'Server result is invalid', 'Ajax is failed!');
          }

          if(urlDebugger() && _textStatus == 'error')
          {
            alert(JSON.stringify( _jqXHR ));
          }
        }
      }
    }
    else
    {
      if(urlLangFa())
      {
        notif('fatal', 'هیچ پاسخی از سرور  دریافت نشد', 'درخواست ناموفق بود!');
      }
      else
      {
        notif('fatal', 'No result from server', 'Ajax is failed!');
      }
    }
  }
}

