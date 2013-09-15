var propertiesKey = "properties";
var indentation = "    ";
var propertyValueStats = {};
var valueStats = {};


function updatePropertyValueStats(property, values) {
  if (propertyValueStats[property] === undefined) {
    propertyValueStats[property] = {};
  }

  $.each(values, function(idx, value) {
    if (typeOfValue(value) !== "variable") { 
      if (propertyValueStats[property][value] === undefined) {
        propertyValueStats[property][value] = 0;
      }

      propertyValueStats[property][value] += 1;

      if (valueStats[value] === undefined) {
        valueStats[value] = 0;
      }

      valueStats[value] += 1;
    }
  });
}

function typeOfValue(value) {
  if ($.inArray(value, colors) > 0) {
    return "color";
  }

  if (value.match(/^#/) || value.match(/^rgb\(/)) {
    return "color";
  }

  var maybeType = value.match(/(px|em|rem|%)$/);
  if ($.isArray(maybeType)) {
    if (maybeType[0] === "%") {
      return "percentage";
    }
    return maybeType[0];
  };

  if (value.match(/^\$/)) {
    return "variable";
  }

  return "other";
}

function leafToHTML(leaf) {
  var result = [];

  $.each(leaf, function(idx, line) {
    if (line.indexOf(":") > -1) {
      var values = line.substring(line.indexOf(":") + 1, line.indexOf(";")).match(/\S+/g);
      var property = line.substring(0, line.indexOf(":"));
      var newLine = "<span class = 'property-name'>" + property + "</span>:";
      $.each(values, function(idx, value) {
        newLine += " <span class = 'value " + property + " " + value + " " + typeOfValue(value) + "'>" + value + "</span>";
      });

      result.push(newLine + ";<br>");
      updatePropertyValueStats(property, values);
    } else {
      result.push(line + "<br>");
    }
  });

  return result;
}

function treeToHTMLHelper(selector, tree) {
  if (selector === propertiesKey) {
    return leafToHTML(tree);
  }

  var treeKeys = Object.keys(tree).filter(function(key) { return key !== propertiesKey; });
  treeKeys.unshift(propertiesKey);
  var result = ["<div class = 'selector'><span class = 'selector-name'>" + selector + "</span> {", indentation + "<div class = 'selector-content'>"];
  $.each(treeKeys, function(idx, subtreeSelector) {
    if (subtreeSelector !== propertiesKey) {
      result.push("");
    }
    var subtree = tree[subtreeSelector];
    if (subtree === undefined) {
      subtree = {};
    }
    $.each(treeToHTMLHelper(subtreeSelector, subtree), function(idx, line) {
      result.push(indentation + line);
    });
  });

  result.push(indentation + "</div>");
  result.push("}</div>");
  return result;
}

function mixinsToHTML(mixins) {
  if (mixins === undefined) {
    return "";
  }
  var html = "";
  $.each(mixins, function(selector, subtree) {
    html += treeToHTMLHelper(mixinsKey + " " + selector, subtree).join("\n");
    html += "\n\n";
  });
  return html;
}

function variablesToHTML(variables) {
  if (variables === undefined) {
    return "";
  }
  html = "";
  $.each(variables, function(property, value) {
    html += property + ": " + value + ";<br>\n";
  });
  return html;
}

var mixinsKey = "@mixin";
var variablesKey = "variables";

function treeToHTML(tree) {
  var html = "";
  html += mixinsToHTML(tree[mixinsKey]);
  html += variablesToHTML(tree[variablesKey]);
  delete tree[mixinsKey];
  delete tree[variablesKey];

  $.each(tree, function(idx, val) {
    html += treeToHTMLHelper(idx, val).join("\n");
    html += "\n\n";
  });
  return html;
}

var colors = ['AliceBlue',
'AntiqueWhite',
'Aqua',
'Aquamarine',
'Azure',
'Beige',
'Bisque',
'Black',
'BlanchedAlmond',
'Blue',
'BlueViolet',
'Brown',
'BurlyWood',
'CadetBlue',
'Chartreuse',
'Chocolate',
'Coral',
'CornflowerBlue',
'Cornsilk',
'Crimson',
'Cyan',
'DarkBlue',
'DarkCyan',
'DarkGoldenRod',
'DarkGray',
'DarkGreen',
'DarkKhaki',
'DarkMagenta',
'DarkOliveGreen',
'DarkOrange',
'DarkOrchid',
'DarkRed',
'DarkSalmon',
'DarkSeaGreen',
'DarkSlateBlue',
'DarkSlateGray',
'DarkTurquoise',
'DarkViolet',
'DeepPink',
'DeepSkyBlue',
'DimGray',
'DodgerBlue',
'FireBrick',
'FloralWhite',
'ForestGreen',
'Fuchsia',
'Gainsboro',
'GhostWhite',
'Gold',
'GoldenRod',
'Gray',
'Green',
'GreenYellow',
'HoneyDew',
'HotPink',
'IndianRed',
'Indigo',
'Ivory',
'Khaki',
'Lavender',
'LavenderBlush',
'LawnGreen',
'LemonChiffon',
'LightBlue',
'LightCoral',
'LightCyan',
'LightGoldenRodYellow',
'LightGray',
'LightGreen',
'LightPink',
'LightSalmon',
'LightSeaGreen',
'LightSkyBlue',
'LightSlateGray',
'LightSteelBlue',
'LightYellow',
'Lime',
'LimeGreen',
'Linen',
'Magenta',
'Maroon',
'MediumAquaMarine',
'MediumBlue',
'MediumOrchid',
'MediumPurple',
'MediumSeaGreen',
'MediumSlateBlue',
'MediumSpringGreen',
'MediumTurquoise',
'MediumVioletRed',
'MidnightBlue',
'MintCream',
'MistyRose',
'Moccasin',
'NavajoWhite',
'Navy',
'OldLace',
'Olive',
'OliveDrab',
'Orange',
'OrangeRed',
'Orchid',
'PaleGoldenRod',
'PaleGreen',
'PaleTurquoise',
'PaleVioletRed',
'PapayaWhip',
'PeachPuff',
'Peru',
'Pink',
'Plum',
'PowderBlue',
'Purple',
'Red',
'RosyBrown',
'RoyalBlue',
'SaddleBrown',
'Salmon',
'SandyBrown',
'SeaGreen',
'SeaShell',
'Sienna',
'Silver',
'SkyBlue',
'SlateBlue',
'SlateGray',
'Snow',
'SpringGreen',
'SteelBlue',
'Tan',
'Teal',
'Thistle',
'Tomato',
'Turquoise',
'Violet',
'Wheat',
'White',
'WhiteSmoke',
'Yellow',
'YellowGreen']
