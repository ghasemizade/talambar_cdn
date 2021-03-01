/**
 * add captcha to all requests
 * @return {[type]} [description]
 */
function runRecaptcha()
{
	var site_key = $('meta[name="recaptcha"]').attr('content');

  grecaptcha.ready(function() {
    console.log(11);
    grecaptcha.execute(site_key, {action: 'submit'}).then(function(token)
    {
     console.log(12);
    	// add to requests
      // Add your logic to submit to your backend server here.
      console.log(token);
    });
  });
}

