
function insideIframe()
{
  if (top.location != self.location)
  {
    var allowIframe = null;
    if($('body').attr('data-env') === 'Jibres')
    {
      if($('body').attr('data-in') === 'business')
      {
        allowIframe = true;
      }
    }

    if(allowIframe)
    {
      $('body').attr('data-iframe', 'preview');
    }
    else
    {
      $('body').attr('data-iframe', '').html('');
    }

    // if(window.top.$('body').attr('data-env') !== 'Jibres')
    // {
    //   self.location = window.location.origin + "/billboard";
    // }
  }
};

