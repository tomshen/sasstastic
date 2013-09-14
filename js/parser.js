function parseSCSS (css) {
  // We pretend @* CSS selectors don't exist.

  function getNode(currNode, selectors) {
    if(selectors.length === 0)
      return currNode;
    var selector = selectors[0];
    if(!currNode[selector])
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
    node['properties'] = node['properties'].concat(properties);
  }

  var tree = { '@mixin': [], 'variables': [] };
  css = css.trim();

  var i = 0;
  while(i < css.length) {
    // handle variables
    if(css[i] === '$') {
      var semicolonIndex = css.indexOf(';', i);
      var variableAssignment = css.slice(i, semicolonIndex).split(':');
      var variableName = variableAssignment[0].trim(),
          variableValue = variableAssignment[1].trim();
      tree.variables[variableName] = variableValue;
      i = semicolonIndex + 1;
    } else {
      var openBraceIndex = css.indexOf('{', i);
      var closeBraceIndex = css.indexOf('}',openBraceIndex);
      var selectorGroups = css.slice(i, openBraceIndex).split(',')
                              .map(function (s) {
                                return s.trim().replace('.', ' .')
                                               .replace('#', ' #')
                                               .split(' ');
                              });
      var properties = css.slice(openBraceIndex + 1,
                                 closeBraceIndex).split(';');
      selectorGroups.forEach(function (selectors) {
        addProperties(selectors, properties);
      });
      i = closeBraceIndex + 1;
    }
  }

  return tree;
}

module.exports.parseSCSS = parseSCSS;