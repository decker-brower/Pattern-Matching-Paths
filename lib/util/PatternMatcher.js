/*jslint node: true */
// The module to be exported.
var PatternMatcher = module.exports = {};
//import the Pattern module
var Pattern = require("./Pattern");
//import the Path module
var Path = require("./Path");
//import the BinarySearchTree module
var BinarySearchTree = require("./BinarySearchTree");

//method to initialize the PatternMatcher
PatternMatcher.init = function(data) {
    //split the file input into an array of strings
    this.dataArray = data.split("\n");
    //get the pattern count
    this.patternCount = parseInt(this.dataArray[0], 10);
    //get the path count
    this.pathCount = parseInt(this.dataArray[this.patternCount + 1], 10);
    //the patterns
    this.patternArray = this.dataArray.slice(1, this.patternCount + 1);
    //the paths
    this.pathArray = this.dataArray.slice(this.patternCount + 2);
    //build the patternTree
    this.patternTree = this.buildPatternTree();
    //find the matching patterns
    this.matchArray = this.findMatches();
};

PatternMatcher.buildPatternTree = function() {
    var i = this.patternCount;
    
    var patternTree = new BinarySearchTree();
    
    while(i--) {
        patternTree.add(new Pattern(this.patternArray[i]));
    }
    
    return patternTree;
};

PatternMatcher.findMatches = function() {
    var i = this.pathCount;
    var result = [];
    
    while(i--) {
        result.push(this.patternTree.contains(new Path(this.pathArray[i])));
    }
    
    return result;
};

function DumpObjectIndented(obj, indent)
{
  var result = "";
  if (indent === null) indent = "    ";

  for (var property in obj)
  {
    var value = obj[property];
    if (typeof value == 'string')
      value = "'" + value + "'";
    else if (typeof value == 'object')
    {
      if (value instanceof Array)
      {
        // Just let JS convert the Array to a string!
        value = "[ " + value + " ]";
      }
      else
      {
        // Recursive dump
        // (replace "  " by "\t" or something else if you prefer)
        var od = DumpObjectIndented(value, indent + "  ");
        // If you like { on the same line as the key
        //value = "{\n" + od + "\n" + indent + "}";
        // If you prefer { and } to be aligned
        value = "\n" + indent + "{\n" + od + "\n" + indent + "}";
      }
    }
    result += indent + "'" + property + "' : " + value + ",\n";
  }
  return result.replace(/,\n$/, "");
}

//method to log the pattern matches
PatternMatcher.outputMatches = function() {
    return this.matchArray.reverse().join("\n");
    //return DumpObjectIndented(this.patternTree._root);
};