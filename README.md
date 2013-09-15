sasstastic
==========

CSS to Sass converter

Frequency Statistics:

Along with the HTML, two other data structures will be returned from the web worker that parses the html. These are propertyValueStats and valueStats. propertyValueStats is laid out like this:
{
  propertyName1 : {
    value1 : N1;
    value2: N2;
    ...
    valueM: NM;
  }
  ...
  propertyNameX : {
    ...
  }
}

propertyValueStats is a set of property -> object, where the properties are properties observed during the parsing. propertyValueStats[propertyName] is an object that goes from values that appear for the propertyName, to the number of times that value appears for the propertyName.

valueStats is simpler, it keys from values, to how many times that value ever appears.