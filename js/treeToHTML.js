var propertiesKey = "properties";
var indentation = "    ";

function leafToHTML(leaf) {
  return leaf;
}

function treeToHTMLHelper(selector, tree) {
  if (selector === propertiesKey) {
    return leafToHTML(tree);
  }

  var result = [selector + " {"];
  $.each(tree, function(subtreeSelector, subtree) {
     $.each(subtreeToHTMLHelper(subtreeSelector, subtree), function(idx, line) {
       result.push(indentation + line);
     });
     result.push("");
  });

  result.push("}");
  return result;
}

function treeToHTML(tree) {
  var html = "";
  $.each(tree, function(idx, val) {
    html += "\n".join(treeToHTMLHelper(idx, val));
    html += "\n\n";
  });
}