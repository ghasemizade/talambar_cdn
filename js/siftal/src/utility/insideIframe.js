
function insideIframe()
{
  if (top.location != self.location)
  {
    $('body').attr('data-iframe', '').html('');
    self.location = "https://cdn.talambar.com/page/iframe";
  }
};

