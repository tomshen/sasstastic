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


  $("#variable-name-input").blur(function() {
    name = getVariableName();
    console.log(name);
  })

  $("#variable-skip").click(function(){
    skipValue($("#variable-value-display").text());
  })

  $("#variable-apply").click(function(){
    name = getVariableName();
    console.log(name);
    if(name !== "false" && name) {
      valueToVariable($("#variable-value-display").text(), name);
    }
  })


  //Hide everything, and then show the first box
  hideEverythingImmediately();
  showEntry();

  //when they click to submit the css, hide the
  //submit area and show the editor
  $('#css-submit-button').click(function() {
    tree = parseSCSS($('#css-entry-textarea').val());
    treeHTML = treeToHTML(tree);

    $(".css-container").html(treeHTML);
    newValue = nextValue();

    $("#variable-value-display").text(newValue);

    showEditor();
  });


  //when they click to submit the edited css, hide the
  //css editing area and show the output
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
