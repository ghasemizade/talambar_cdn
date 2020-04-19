function pageScript()
{
	$.ajax(
	{
	 url : $("#urlthat").text(),
	 type : 'post',
	 data : {"create":"store"},
	 dataType: 'json',
	 success : function()
	 {
	  Navigate({ url: $("#urlthis").text() + "/opening" });
	 },
	 done : function()
	 {
	  Navigate({ url: $("#urlthis").text() + "/opening" });
	 },
	 fail : function()
	 {
	  Navigate({ url: $("#urlthis").text() + "/error" });
	 },
	 statusCode: {
	  501: function() {
	    Navigate({ url: $("#urlthis").text() + "/error" });
	  }
	 }
	});

	$("#linkmhe").delay( (60 * 1000) ).fadeIn( 400 );
}



$(document).ready(function(){
  pageScript();
});