function sanitizeValue(value) {
  return value.replace(/\./g,'\\.')
              .replace(/\#/g,'\\#')
              .replace(/\,/g,'\\,')
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
    var multiplier = getMultiplier(value, currentValue);
    $(occurance)
      .attr("class", "variable")
      .text((!$.isNumeric(multiplier) || multiplier === 1? "" : multiplier + "*") + variableName);
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
  $("." + typeOfValue(value)).addClass("active-type");
  highLightAllOfValue(value);
}

function unHighLightAllOfType(value) {
  $("." + typeOfValue(value)).removeClass("active-type").removeClass("highlighted");
}

var valuesQueue = [];

function nextValue() {
  if ($.isEmptyObject(valueStats)) {
    return undefined;
  }

  if (!(valuesQueue.length > 0)) {
    valuesQueue = Object.keys(valueStats).sort(function(a,b) {
      return valueStats[b] - valueStats[a];
    });
  }
  var val = valuesQueue.shift();
  if (valueStats[val] === undefined) {
    val = nextValue();
  }
  highLightAllOfType(val);
  return val;
}

function skipValue(value) {
  unHighLightAllOfType(value);
  delete valueStats[value];
  return nextValue();
}

