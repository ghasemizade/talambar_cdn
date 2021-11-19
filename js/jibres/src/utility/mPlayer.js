
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

	// check duration of video and show inside magicBox
	$('[data-magicbox] video').on('loadedmetadata', function(index)
	{
		var myDuration = parseInt(this.duration);
		var videoFrame = $(this).parents('[data-magicbox]');

		videoFrame.find('[data-magic-caption] .duration').attr('data-duration', myDuration).html(myDuration);
		console.log(this.duration);
	});
}