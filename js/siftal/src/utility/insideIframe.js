
function insideIframe()
{
  if (top.location != self.location)
  {
    $('body').attr('data-iframe', '').html('');

    self.location = $('body[base]').attr('href')+ "/billboard";
  }
};

