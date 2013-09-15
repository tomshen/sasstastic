$(document).ready(function() {
	$('#css-entry-textarea').tabby({tabString:'  '});



	$('#instructions-content').slideUp(0);

	$('#instructions-toggle').click(function() {
		$('#instructions-toggle').toggleClass("extended")
		$('#instructions-content').slideToggle();
	})
});