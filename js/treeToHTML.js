var propertiesKey = "properties";
var indentation = "    ";

function leafToHTML(leaf) {
  var result = [];

  $.each(leaf, function(idx, line) {
    var values = line.substring(line.indexOf(":") + 1, line.indexOf(";")).match(/\S+/g);
    var property = line.substring(0, line.indexOf(":"));
    var newLine = property + ":";
    $.each(values, function(idx, value) {
      newLine += "<span class = '" + property + " " + value + "'>" + value + "</span>";
    });

    result.push(newLine + ";<br>")
  });

  return result;
}

function treeToHTMLHelper(selector, tree) {
  if (selector === propertiesKey) {
    return leafToHTML(tree);
  }

  var treeKeys = Object.keys(tree).filter(function(key) { return key !== propertiesKey; });
  treeKeys.unshift(propertiesKey);
  var result = ["<div class = 'selector'>" + selector + " {"];
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

  result.push("}</div>");
  return result;
}

function treeToHTML(tree) {
  var html = "";
  $.each(tree, function(idx, val) {
    html += treeToHTMLHelper(idx, val).join("\n");
    html += "\n\n";
  });
  return html;
}