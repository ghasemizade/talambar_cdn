
function mPlayer()
{
	$('video[data-clickable]').off('click').on('click', function()
	{
		console.log('clicked');
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