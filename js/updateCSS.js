// Converts all active instances of value to use variableName
function valueToVariable(value, variableName) {
  $(".active-type.highlighted")
    .removeClass(value)
    .removeClass("highlighted")
    .addClass("variable")
    .text(variableName);
  $(".active-type").removeClass("active-type");
}
