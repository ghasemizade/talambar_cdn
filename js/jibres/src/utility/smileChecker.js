
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
    url: urlJibres('sitelang') + "hook/smile",
    method:"POST",
    timeout: 3000,
    dataType:"json",
    data:
    {
      'notifOn': aleadyIsNew,
      'url-env': $('body').attr('data-env'),
      'url-in': $('body').attr('data-in'),
      'url-page': $('body').attr('data-page')
    },
    success:function(smileResult)
    {
      var response = smileResult.result;
      var notifCount = null;
      var orderCount = null;

      if(response)
      {
        if(response.notifCount)
        {
          notifCount = response.notifCount;
        }
        if(response.orderCount)
        {
          orderCount = response.orderCount;
        }
      }

      // show new notif message only one time
      if(typeof(Storage) !== "undefined")
      {
        newNotif = parseInt(sessionStorage.getItem("newNotif"));
        newOrder = parseInt(sessionStorage.getItem("newOrder"));
        if(isNaN(newNotif))
        {
          newNotif = 0;
        }
        if(isNaN(newOrder))
        {
          newOrder = 0;
        }

        if(notifCount)
        {
          if(newNotif && newNotif !== notifCount)
          {
            sessionStorage.setItem("newNotif", notifCount);
            playAudio('new-notification-2.mp3');
            notifGenerator(smileResult);
          }
        }

        if(orderCount)
        {
          if(newOrder && newOrder !== orderCount)
          {
            sessionStorage.setItem("newOrder", orderCount);
            playAudio('new-order-2.mp3');
          }
        }

      }

      // if user is loginned on this page, try to check logout
      if($('meta[name="user-Jibres"]').attr("content"))
      {
        if(checkSmileLoginned(smileResult))
        {
          // if is not logged out
          checkNewOrder(orderCount)
          // check notifications
          checkNewNotification(smileResult);
          // check redirect
          checkSmileRedirect(smileResult);
        }
      }
    }
  });

}


function checkSmileLoginned(_data)
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
    panelHeaderEl.attr('data-count', fitNumber(_data.result.notifCount));
    pwaFooterEl.attr('data-count', fitNumber(_data.result.notifCount));
  }
  else
  {
    panelHeaderEl.attr('data-count', null);
    pwaFooterEl.attr('data-count', null);
  }

}


function checkNewOrder(_orderCount)
{
  var panelHeaderEl           = $('[data-panel] #pageHeader .orders i');
  var pwaFooterEl             = $('#pageFooter .pwa [data-key="orders"] i');
  var panelBusinessDashDataEl = $('[data-panel] .item.unprocessedOrder .value');

  if(!_orderCount)
  {
    _orderCount = 0;

  }

  panelHeaderEl.attr('data-count', fitNumber(_orderCount));
  pwaFooterEl.attr('data-count', fitNumber(_orderCount));
  // set in dashboard
  panelBusinessDashDataEl.text(fitNumber(_orderCount));
}

