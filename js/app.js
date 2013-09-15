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

  //when they click to submit the css, hide the
  //submit area and show the editor
  $('#css-submit-button').click(function() {
    tree = parseSCSS($('#css-entry-textarea').val());
    treeHTML = treeToHTML(tree);

    $(".css-container").html(treeHTML);
    showEditor();
  });


  $("#edited-css-submit-button").click(function() {

    text = $(".css-container").text();

    $("#css-output-textarea").text(text);
    showOutput();
  }) 
});


function hideEverythingImmediately() {
  $(".css-editor").fadeOut(0);
  $(".css-output").fadeOut(0);
  $(".css-entry").fadeOut(0);
  $(".error").slideUp(0);
}

function showEntry() {
  $(".css-entry").fadeIn(500);
}

function showEditor() {
  $(".css-entry").fadeOut(500);
  setTimeout(function() {
    $(".css-editor").fadeIn();
  }, 502)
}

function showOutput() {
  $(".css-editor").fadeOut(500);
  setTimeout(function() {
    $(".css-output").fadeIn();
  }, 502)
}

function makeError(err) {
  $("#variable-name-errors").text(err);
}


function getVariableName() {
  var name = $("#variable-name-input").val();

  if(name[0] !== "$") {
    makeError("Variable names must start with the dollar sign ($)");
    return false;
  }

  if(name.search(/\s/) !== -1) {
    makeError("Variable names must not contain spaces")
    return false;
  }
  if(name === "") {
    makeError("Enter variable name")
    return false;
  }
}