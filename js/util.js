function getMultiplier(baseValue, otherValue) {
  return parseInt(otherValue, 10) / parseInt(baseValue, 10);
}

function colorToRGBA(color) {
  var r, g, b, a;
  color = color.trim().toLowerCase();

  if (color[0] === '#') {
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
    a = 1.0;
  } else if (color.indexOf('rgb') === 0) {
    var values = color.slice(color.indexOf('(') + 1, color.indexOf(')')).split(',');
    if (values.length !== 3)
      return null;
    r = parseInt(values[0].trim(), 10);
    g = parseInt(values[1].trim(), 10);
    b = parseInt(values[2].trim(), 10);
    if (values.length === 4)
      a = parseInt(values[3].trim(), 10);
    else a = 1.0;
  } else {
    return null;
  }
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

function typeOfValue(value) {
  if ($.inArray(value, colors) > 0) {
    return "color";
  }

  if (value.match(/^#/) || value.match(/^rgb\(/) || value.match(/^rgba\(/)) {
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
