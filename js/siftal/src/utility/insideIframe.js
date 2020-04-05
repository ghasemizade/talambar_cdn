
function insideIframe()
{
  if (top.location != self.location)
  {
    $('body').attr('data-iframe', '').html('');

    self.location = window.location.origin + "/billboard";
  }
};

