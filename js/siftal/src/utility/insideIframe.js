
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
      $('html').attr('data-iframe', 'preview');
    }
    else
    {
      $('html').attr('data-iframe', 'block').html('');
    }

    // if(window.top.$('body').attr('data-env') !== 'Jibres')
    // {
    //   self.location = window.location.origin + "/billboard";
    // }
  }
};

