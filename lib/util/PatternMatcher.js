// The module to be exported.
var PatternMatcher = module.exports = {};
//import the Pattern module
var Pattern = require("./Pattern");
//import the Path module
var Path = require("./Path");
//import the Matcher module
var Matcher = require("./Matcher");

//method to initialize the PatternMatcher
PatternMatcher.init = function(data) {
    //split the file input into an array of strings
    this.dataArray = data.split("\n");
    //the patterns
    this.patternArray = [];
    //the paths
    this.pathArray = [];
    //get the pattern count
    this.patternCount = parseInt(this.dataArray[0], 10);
    //get the path count
    this.pathCount = parseInt(this.dataArray[this.patternCount + 1], 10);
    //build the pattern array
    this.buildPatternArray();
    //build the path array
    this.buildPathArray();
    //find the matching patterns
    this.matchArray = Matcher.findMatches(this.pathArray, this.patternArray);
};

PatternMatcher.buildPatternArray = function() {
    //loop through the patterns
    while(this.patternCount > 0) {
        //get the pattern
        var pattern = this.dataArray[this.patternCount];
        
        //validate and push the pattern into the pattern array
        this.patternArray.push(Pattern.Validate(pattern));
        
        //decrement the loop counter
        this.patternCount--;
    }
};

PatternMatcher.buildPathArray = function() {
    //loop through the paths
    while(this.pathCount > 0) {
        //get the path
        var path = this.dataArray[this.dataArray.length - this.pathCount];
        
        //validate and push the path into the path array
        this.pathArray.push(Path.Validate(path));
        
        //decrement the loop counter
        this.pathCount--;
    }
};

//method to log the pattern matches
PatternMatcher.outputMatches = function() {
    var output = "";
    
    this.matchArray.forEach(function(match) {
        output += match + "\n";
    });
    
    return output;
};