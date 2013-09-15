function hideError() {
  $(".error").slideUp();
}
function showError() {
  $(".error").slideDown();
}
function makeError(err) {
  $("#variable-name-errors").text(err);
  showError();
}


function getVariableName() {
  var name = $("#variable-name-input").val();

  hideError();

  if(name[0] !== "$") {
    makeError("Variable names must start with the dollar sign ($)");
    return false;
  }

  if(name.search(/[^\$\-\_\sa-zA-Z0-9]/) !== -1) {
    makeError("Variable names must not contain invalid characters")
    return false;
  }
  if(name === "") {
    makeError("Enter variable name")
    return false;
  }
  if(name) {
    $("#variable-name-display").text(name);
  }
  return name;
}