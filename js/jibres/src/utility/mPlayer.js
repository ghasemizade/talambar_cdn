
function mPlayer()
{
	$('[data-magicbox] video').off('click.video').on('click.video', function()
	{
		var videoFrame = $(this).parents('[data-magicbox]');

		if(this.paused)
		{
			this.play()
			videoFrame.attr('data-playing', 'play');
		}
		else
		{
			this.pause()
			videoFrame.attr('data-playing', 'pause');
		}
	});
}