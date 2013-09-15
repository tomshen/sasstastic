var tree = {};

$(document).ready(function() {
  //Initiate the editing interface
  $('#css-entry-textarea').tabby({tabString:'  '});


  //hide the instructions
  $('#instructions-content').slideUp(0);

  //make the instructions slide down on a click
  $('#instructions-toggle').click(function() {
    $('#instructions-toggle').toggleClass("extended")
    $('#instructions-content').slideToggle();
  });


  //Hide everything, and then show the first box
  hideEverythingImmediately();
  showEntry();
  $('#css-submit-button').click(function() {
    tree = parseSCSS($('#css-entry-textarea').val());
    treeHTML = treeToHTML(tree);

    $(".css-container").html(treeHTML);
    showEditor();
  });
});


function hideEverythingImmediately() {
  $(".css-editor").fadeOut(0);
  $(".css-output").fadeOut(0);
  $(".css-entry").fadeOut(0);
}

function showEntry() {
  $(".css-entry").fadeIn(500);
}

function showEditor() {
  $(".css-entry").fadeOut(500);
  setTimeout(function() {
    $(".css-editor").fadeIn();
  }, 500)
}

function showOutput() {
  $(".css-editor").fadeOut(500);
  setTimeout(function() {
    $(".css-output").fadeIn();
  }, 500)
}