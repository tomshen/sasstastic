function parseSCSS (css) {
  /* Assumes valid SCSS as input. Does not work with advanced CSS selectors or
   * media queries. */

  function removeComments(cssWithComments) {
    return cssWithComments.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, '');
  }

  function getNode(currNode, selectors) {
    if (selectors.length === 0)
      return currNode;
    var selector = selectors[0];
    if (!currNode[selector])
      currNode[selector] = { 'properties': [] };
    return getNode(currNode[selector], selectors.slice(1));
  }

  function addProperties(selectors, properties) {
    selectors = selectors.map(function (s) {
      return s.trim();
    }).filter(function (s) {
      return !!s;
    });
    properties = properties.map(function (s) {
      return s.trim();
    }).filter(function (s) {
      return !!s;
    }).map(function (s) {
      return s + ';';
    });

    var node = getNode(tree, selectors);
    node.properties = node.properties.concat(properties);
  }

  var tree = { '@mixin': {}, 'variables': {}, 'properties': [] };
  css = removeComments(css.trim());

  function findClosingBrace(css, openingBraceIndex) {
    var braceIndex = openingBraceIndex + 1;
    var counter = 1;
    while (counter > 0) {
      var oi = css.indexOf('{', braceIndex);
      var ci = css.indexOf('}', braceIndex);
      if (braceIndex >= css.length || (oi === -1 && ci === -1)) {
        console.error('Invalid SCSS.');
        return;
      }
      if (ci === -1 || (oi !== -1 && oi < ci)) {
        counter++;
        braceIndex = oi + 1;
      } else {
        counter--;
        braceIndex = ci + 1;
      }
    }
    return braceIndex - 1;
  }

  var i = 0;
  while (i < css.length) {
    var semicolonIndex = css.indexOf(';', i);
    var openBraceIndex = css.indexOf('{', i);
    if (semicolonIndex !== -1 && semicolonIndex < openBraceIndex) {
      // if we have a SCSS property or variable
      var property = css.slice(i, semicolonIndex + 1).trim();
      if (property[0] === '$') {
        var variableAssignment = css.slice(i, semicolonIndex).split(':');
        var variableName = variableAssignment[0].trim(),
            variableValue = variableAssignment[1].trim();
        tree.variables[variableName] = variableValue;
      } else {
        tree.properties.push(property);
      }
      i = semicolonIndex + 1;
    } else {
      // normal (possibly nested) CSS
      var closeBraceIndex = findClosingBrace(css, openBraceIndex);
      var selectorGroups =
        css.slice(i, openBraceIndex).split(',')
           .map(function (s) {
            s = s.trim();
            // to ensure class/id separation for splitting
            if (s[0] === '.')
              s = '.' + s.split('.').slice(1).join(' .').replace('#', ' #');
            else if (s[0] === '#')
              s = '#' + s.split('#').slice(1).join(' #').replace('.', '. ');
            return s.split(' ');
          });
      if (closeBraceIndex > css.indexOf('}', openBraceIndex)) {
        // handle nested SCSS
        selectorGroups.forEach(function (selectors) {
          var node = getNode(tree, selectors);
          var interiorNode = parseSCSS(css.slice(openBraceIndex + 1,
                                                 closeBraceIndex).trim());
          _.forEach(interiorNode, function (value, key) {
              node[key] = value;
            });
          i = closeBraceIndex + 1;
        });
      } else {
        // handle plain old CSS
        var properties = css.slice(openBraceIndex + 1,
                                   closeBraceIndex).split(';');
        selectorGroups.forEach(function (selectors) {
          addProperties(selectors, properties);
        });
        i = closeBraceIndex + 1;
      }
    }
  }
  if (_.isEmpty(tree['@mixin'])) delete tree['@mixin'];
  if (_.isEmpty(tree['variables'])) delete tree['variables'];
  return tree;
}