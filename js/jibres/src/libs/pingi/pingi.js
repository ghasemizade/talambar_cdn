
function pingi()
{
  // ping google to check internet connection
  // pingiGoogle();
  // ping our website to check our website is up or not!
  pingiWebsite(true);
}


function pingiWebsite(_firstTime)
{
  if(navigator.onLine)
  {
    $.ajax(
      {
        url: window.location.protocol + "//" + window.location.hostname,
        cache: false,
        timeout: 500,
        processData: false,
        contentType: false,
        // dataType: 'json',
        data :
        {
            'cmd' : 'ping',
        },
      })
      .done(function(data, status, xhr)
      {
        console.log('We are okay!');
        $("body").trigger("pingi:website:ok", _firstTime);
      })
      .fail(function(_result, _textStatus, _error)
      {
        console.log('fail get website with ping :|');
        $("body").trigger("pingi:website:fail", _firstTime);
      }
    );
  }
  else
  {
    console.log('We have no internet connection!');
    $("body").trigger("pingi:offline", _firstTime);
  }

}


function pingiRunner()
{
  // on fail do something
  $('body').on('pingi:website:fail', function(_e, _firstTime)
  {
    // show notif if we cant see website
    if($('html').attr('lang') === 'fa')
    {
      notif('warn', "ما نمی‌توانیم  "+ window.location.hostname + " را ببینیم", 'ارتباط از دست رفت!', 8000, {'position':'topCenter', 'icon':'sf-exclamation-circle', 'displayMode':1});
    }
    else
    {
      notif('warn', "We can't see "+ window.location.hostname, 'Connection is lost', 8000, {'position':'topCenter', 'icon':'sf-exclamation-circle', 'displayMode':1});
    }


    // disallow to run multiple and only create one task to check
    if(_firstTime)
    {
      if($("body").attr('data-offline') === undefined)
      {
        setTimeout(pingiWebsite, 10000);
        // set offline mode
        $("body").attr('data-offline', '');
      }
    }
    else
    {
      // after a delay try to recheck connection
      setTimeout(pingiWebsite, 10000);
    }
  });

  // if we are get online again
  $('body').on('pingi:website:ok', function(_e, _firstTime)
  {
    // we are online and now again online
    if($("body").attr('data-offline') === undefined)
    {

    }
    else
    {
      if($('html').attr('lang') === 'fa')
      {
        notif('okay', "ما روی  "+ window.location.hostname + " آنلاین هستیم", 'اتصال برقرار شد', 5000, {'position':'topCenter', 'icon':'sf-link', 'displayMode':1});
      }
      else
      {
        notif('okay', "We are online on "+ window.location.hostname, 'Connection is re-established', 5000, {'position':'topCenter', 'icon':'sf-link', 'displayMode':1});
      }
    }

    // remove offline mode
    $("body").attr('data-offline', null);
  });


  // on fail do something
  $('body').on('pingi:offline', function(_e, _firstTime)
  {
    // show notif if we don't have internet connection
    if($('html').attr('lang') === 'fa')
    {
      notif('fatal', 'اینترنت شما قطع شده است!', "لطفا ارتباط اینترنت خود را بررسی کنید", 10000, {'position':'topCenter', 'icon':'sf-plug', 'displayMode':1});
    }
    else
    {
      notif('fatal', "Check your internet connection", 'No internet!', 10000, {'position':'topCenter', 'icon':'sf-plug', 'displayMode':1});
    }


    // disallow to run multiple and only create one task to check
    if(_firstTime)
    {
      if($("body").attr('data-offline') === undefined)
      {
        setTimeout(pingiWebsite, 10000);
        // set offline mode
        $("body").attr('data-offline', '');
      }
    }
    else
    {
      // after a delay try to recheck connection
      setTimeout(pingiWebsite, 10000);
    }
  });
}

