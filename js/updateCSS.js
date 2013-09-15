$(document).ready(function() {
  $.delegate(".active-type", "click", function() {
    var highlighted = "highlighted";
    if ($(this).hasClass(highlighted)) {
      $(this).removeClass(highlighted);
    } else {
      $(this).addClass(highlighted);
    }
  });
});


// Converts all active instances of value to use variableName
function valueToVariable(value, variableName) {
  var highlighted = $(".active-type.highlighted");
  highlighted
    .removeClass(value)
    .removeClass("highlighted")
    .addClass("variable")
    .text(variableName);
  $(".active-type").removeClass("active-type");
  return highlighted.length();
}

function highLightAllOfValue(value) {
  $("." + value).addClass("active-type").addClass("highlighted");
}