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
	  Navigate({ url: $("#urlthisopening").text() });
	 },
	 done : function()
	 {
	  Navigate({ url: $("#urlthisopening").text() });
	 },
	 fail : function()
	 {
	  Navigate({ url: $("#urlthiserror").text() });
	 },
	 statusCode: {
	  501: function() {
	    Navigate({ url: $("#urlthiserror").text() });
	  }
	 }
	});

	$("#linkmhe").delay( (60 * 1000) ).fadeIn( 400 );
}


