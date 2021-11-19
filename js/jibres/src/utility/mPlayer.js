
function mPlayer()
{
	$('[data-magicbox] video').off('click.magicBoxVideo').on('click.magicBoxVideo', function()
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
	$('[data-magicbox] video').off('loadedmetadata.magicBoxVideo').on('loadedmetadata.magicBoxVideo', function(index)
	{
		var myDuration = Math.round(this.duration);
		var videoFrame = $(this).parents('[data-magicbox]');

		videoFrame.find('[data-magic-caption] .duration').attr('data-duration', myDuration).html(fitNumber(myDuration));
		console.log(this.duration);
	});
}