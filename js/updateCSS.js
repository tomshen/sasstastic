function sanitizeValue(value) {
  return value.replace(/\./g,'\\.')
              .replace(/\%/g,'\\%');
}

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
    .attr("class", "variable")
    .text(variableName);
  $(".active-type").removeClass("active-type");
  valueStats[value] -= highlighted.size();
  if (valueStats[value] === 0) {
    delete valueStats[value];
  }

  return nextValue();
}

// Converts all active instances of value to use variableName
// currently only update valueStats
function valueOfTypeToVariable(value, variableName) {
  var highlighted = $(".active-type.highlighted");
  var changed = 0;
  $.each(highlighted, function(idx, occurance) {
    var currentValue = $(occurance).text();
    $(occurance)
      .attr("class", "variable")
      .text(getMultiplier(value, currentValue) + "*" + variableName);
    valueStats[currentValue] -= 1;
    if (valueStats[currentValue] === 0) {
      delete valueStats[currentValue];
    }
  });
  $(".active-type").removeClass("active-type");

  return nextValue();
}


function highLightAllOfValue(value) {
  $("." + sanitizeValue(value)).addClass("active-type").addClass("highlighted");
}

function unHighLightAllOfValue(value) {
  $("." + sanitizeValue(value)).removeClass("active-type").removeClass("highlighted");
}

function highLightAllOfType(value) {
  $("." + typeOfValue(value)).addClass("active-type").addClass("highlighted");
  unHighLightAllOfValue(value);
}

function unHighLightAllOfType(value) {
  $("." + typeOfValue(value)).removeClass("active-type").removeClass("highlighted");
}

var valuesQueue = [];

function nextValue() {
  if (!(valuesQueue.length > 0)) {
    valuesQueue = Object.keys(valueStats).sort(function(a,b) {
      return valueStats[b] - valueStats[a];
    });
  }
  var val = valuesQueue.shift();
  highLightAllOfValue(val);
  return val;
}

function skipValue(value) {
  unHighLightAllOfValue(value);
  delete valueStats[value];
  return nextValue();
}

