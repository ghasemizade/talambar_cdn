

function escPressed()
{
	$myFocus = $(":focus");
	// if user focused on everything remove focus from it
	if($myFocus.length > 0)
	{
		// if($myFocus.is('input') || $myFocus.is('textarea') || $myFocus.is('select'))
		// {
		// 	$myFocus.trigger("blur");
		// }

		$myFocus.trigger("blur");
		return true;
	}
	// if($('form').length > 0)
	// {
	// 	// if we have form disable esc nav
	// 	return true;
	// }

	// save press counter in sessionStorage
	var pressCounter = null;
	if(typeof(Storage) !== "undefined")
	{
		pressCounter = parseInt(sessionStorage.getItem("escCounter"));
		if(isNaN(pressCounter))
		{
			pressCounter = 0;
		}
		pressCounter += 1;
		sessionStorage.setItem("escCounter", pressCounter);
	}


	if($('.titleBox a.back').length === 1)
	{
		myNewAddr = $('.titleBox a.back').attr('href');
	}
	else
	{
		return false;
	}

	if(myNewAddr)
	{
		if(pressCounter === 1)
		{
			// show info message
			if($('html').attr('lang') === 'fa')
			{
				notif('info', 'با فشردن مجدد دکمه اسکیپ به یک آدرس بالاتر منتقل می‌شوید');
			}
			else
			{
				notif('info', 'Press Esc key another time to go one level up');
			}
			return true;
		}

		sessionStorage.setItem("escCounter", 0);
		Navigate( { url: myNewAddr });
	}
	else if(typeof(Storage) !== "undefined")
	{
		sessionStorage.setItem("escCounter", 0);
	}
}

