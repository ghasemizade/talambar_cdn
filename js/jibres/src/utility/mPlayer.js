
function mPlayer()
{
	$('video').off('click').on('click', function()
	{
		if(this.paused)
		{
			this.play()
		}
		else
		{
			this.pause()
		}
	});
}