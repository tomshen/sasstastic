var tree = {};

$(document).ready(function() {
	$('#css-entry-textarea').tabby({tabString:'  '});



	$('#instructions-content').slideUp(0);

	$('#instructions-toggle').click(function() {
		$('#instructions-toggle').toggleClass("extended")
		$('#instructions-content').slideToggle();
	});

  $('#css-submit-button').click(function() {
    tree = parseSCSS($('#css-entry-textarea').value());
  });
});