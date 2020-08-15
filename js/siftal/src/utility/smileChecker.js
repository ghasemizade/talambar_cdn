
function checkSmileLoop()
{
  setInterval(function()
  {
    checkSmile();;
  }, 10000);
}


function checkSmile(_register)
{
  if(_register)
  {
    checkSmileLoop();
  }
  var aleadyIsNew = false;
  if($('[data-panel] #pageHeader .notification').attr('data-new') !== undefined)
  {
    aleadyIsNew = true;
  }
  // get user language
  var lang = $('html').attr('lang');

  $.ajax(
  {
    url:'/' + lang + "/hook/smile",
    method:"POST",
    timeout: 3000,
    dataType:"json",
    data:
    {
      'notifOn': aleadyIsNew
    },
    success:function(smileResult)
    {
      var notifCount = null;
      if(smileResult.result && smileResult.result.notifCount)
      {
        notifCount = smileResult.result.notifCount;
      }

      // show new notif message only one time
      if(typeof(Storage) !== "undefined")
      {
        newNotif = parseInt(sessionStorage.getItem("newNotif"));
        if(isNaN(newNotif))
        {
          newNotif = 0;
        }

        if(notifCount)
        {
          if(newNotif !== notifCount)
          {
            sessionStorage.setItem("newNotif", notifCount);
            notifGenerator(smileResult);
          }
        }
      }


      // if user is loginned on this page, try to check logout
      if($('meta[name="user-Jibres"]').attr("content"))
      {
        if(checkSmileLogout(smileResult))
        {
          // if is not logged out
          // check notifications
          checkNewNotification(smileResult);
          // check redirect
          checkSmileRedirect(smileResult);
        }
      }
    }
  });

}


function checkSmileLogout(_data)
{
  if(_data.result && _data.result.logout)
  {
    var logoutTxt = 'Logout';
    var logoutUrl = '/logout';

    if(_data.result.logout.txt)
    {
      logoutTxt = _data.result.logout.txt;
    }
    if(_data.result.logout.url)
    {
      logoutUrl = _data.result.logout.url;
    }

    say(
    {
      type: 'warning',
      html: logoutTxt,
      showConfirmButton: false,
      timer: 1000,
      onClose: () =>
      {
        location.replace(logoutUrl);
      }
    });
    return false;
  }

  return true;
}


function checkSmileRedirect(_data)
{
  if(_data && _data.redirect)
  {
    var a = $('<a href="' + _data.redirect + '"></a>');
    if(a.isAbsoluteURL() || _data.direct)
    {
      location.replace(_data.redirect);
    }
    else
    {
      Navigate({ url: _data.redirect });
    }
    return;
  }
}


function checkNewNotification(_data)
{
  var panelHeaderEl = $('[data-panel] #pageHeader .notification i');
  var pwaFooterEl   = $('#pageFooter .pwa [data-key="messages"] i');

  if(_data.result && _data.result.notifNew)
  {
    if(panelHeaderEl.attr('data-new') === undefined)
    {
      // new notif and does not exist before it
    }

    panelHeaderEl.attr('data-new', '');
    pwaFooterEl.attr('data-new', '');
  }
  else
  {
    panelHeaderEl.attr('data-new', null);
    pwaFooterEl.attr('data-new', null);
  }

  if(_data.result && _data.result.notifCount)
  {
    panelHeaderEl.attr('data-count', _data.result.notifCount);
    pwaFooterEl.attr('data-count', _data.result.notifCount);
  }
  else
  {
    panelHeaderEl.attr('data-count', null);
    pwaFooterEl.attr('data-count', null);
  }

}

