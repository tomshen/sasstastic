$(document).ready(function() {
  $(document).delegate(".active-type", "click", function() {
    var highlighted = "highlighted";
    if ($(this).hasClass(highlighted)) {
      $(this).removeClass(highlighted);
    } else {
      $(this).addClass(highlighted);
    }
  });
});


// Converts all active instances of value to use variableName
// currently only update valueStats
function valueToVariable(value, variableName) {
  var highlighted = $(".active-type.highlighted");
  highlighted
    .removeClass(value)
    .removeClass("highlighted")
    .addClass("variable")
    .text(variableName);
  $(".active-type").removeClass("active-type");
  valueStats[value] -= highlighted.size();
  if (valueStats[value] === 0) {
    delete valueStats[value];
  }

  return nextValue();
}

function highlightAllOfValue(value) {
  $("." + value).addClass("active-type").addClass("highlighted");
}

function unhighlightAllOfValue(value) {
  $("." + value).removeClass("active-type").removeClass("highlighted");
}

var valuesQueue = [];

function nextValue() {
  if (!(valuesQueue.length > 0)) {
    valuesQueue = Object.keys(valueStats).sort(function(a,b) {
      return valueStats[b] - valueStats[a];
    });
  }
  var val = valuesQueue.shift();
  highlightAllOfValue(val);
  return val;
}

function skipValue(value) {
  unhighlightAllOfValue(value);
  delete valueStats[value];
  return nextValue();
}

