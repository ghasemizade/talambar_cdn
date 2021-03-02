/**
 * add captcha to all requests
 * @return {[type]} [description]
 */
function runRecaptcha()
{
  var site_key = $('form [name="recaptcha_sitekey"]').val();
  var gaction  = $('form [name="recaptcha_action"]').val();
  var tokenEl  = $('form [name="recaptcha_token"]');

  if(!site_key)
  {
    return false;
  }
  if(!gaction)
  {
    gaction = 'NA';
  }

  grecaptcha.ready(function()
  {
    grecaptcha.execute(site_key, {action: 'submit'}).then(function(token)
    {
      // Add your logic to submit to your backend server here.
      tokenEl.val(token);
      // console.log(token);
    });
  });
}

