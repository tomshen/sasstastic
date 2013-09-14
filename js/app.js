$(document).ready(function() {
	$('#css-entry-textarea').tabby({tabString:'  '});



	$('#instructions-content').slideUp(0);
	$('#instructions-toggle').click(function() {
		$('#instructions-content').slideToggle();
	})
});