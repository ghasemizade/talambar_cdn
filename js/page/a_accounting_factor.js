function pageScript()
{
	$("#factor-auto-calculate-vat").click(function(){

		var total         = $("#input-total").val();
		var totaldiscount = $("#input-totaldiscount").val();

		total         = total.replace(',', '');
		totaldiscount = totaldiscount.replace(',', '');

		final         = parseInt(total) - parseInt(totaldiscount);

		$("#input-totalvat").val(final * 0.09);

	});
}