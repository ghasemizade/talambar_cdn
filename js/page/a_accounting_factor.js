function pageScript()
{
	$("#factor-auto-calculate-vat").click(function(){

		var total         = $("#input-total").val();
		var totaldiscount = $("#input-totaldiscount").val();

		total         = parseInt(total.replace(',', ''));
		totaldiscount = parseInt(totaldiscount.replace(',', ''));

		if(total === NaN)
		{
			total = 0
		}
		if(totaldiscount === NaN)
		{
			totaldiscount = 0;
		}

		final = parseInt(total) - parseInt(totaldiscount);
		vat   = parseInt(final * 0.09);

		$("#input-totalvat").val(vat);

	});
}