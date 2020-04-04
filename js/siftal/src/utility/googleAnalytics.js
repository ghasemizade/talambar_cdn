window.dataLayer = window.dataLayer || [];
var myGID = $('#gAnalyticsScript').attr('data-uid');
if(myGID)
{
	function gtag()
	{
		dataLayer.push(arguments);
	}
	gtag('js', new Date()); gtag('config', myGID);
	function pushStateGA()
	{
		var origin = window.location.protocol + '//' + window.location.host;
		var pathname = window.location.href.substr(origin.length);
		gtag('config', myGID, {'page_path': pathname});
	}
}
