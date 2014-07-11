// The module to be exported.
var PatternMatcher = module.exports = {};
//import the Matcher module
var Matcher = require("./Matcher");

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
    //find the matching patterns
    this.matchArray = Matcher.findMatches(this.pathArray, this.patternArray);
};

//method to log the pattern matches
PatternMatcher.outputMatches = function() {
    return this.matchArray.reverse().join("\n");
};