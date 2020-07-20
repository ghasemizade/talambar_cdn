
function insideIframe()
{
  if (top.location != self.location)
  {
    $('body').attr('data-iframe', '').html('');
    if(window.top.$('body').attr('data-env') !== 'Jibres')
    {
      self.location = window.location.origin + "/billboard";
    }
  }
};

