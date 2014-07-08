#!/usr/bin/env node

// The module to be exported.
var PatternMatcher = module.exports = {};

var Pattern = require("./util/Pattern");
var Path = require("./util/Path");

PatternMatcher.init = function(data) {
    this.dataArray = data.split("\n");
    
    this.patternArray = [];
    
    this.pathArray = [];
    
    this.patternCount = parseInt(this.dataArray[0]);
    
    this.pathCount = this.dataArray[this.patternCount + 1];
    
    //loop through the patterns
    while(this.patternCount > 0) {
        var pattern = this.dataArray[this.patternCount];
        
        this.patternArray.push(Pattern.Validate(pattern));
        
        this.patternCount--;
    }
    console.log(this.pathCount);
    //loop through the paths
    while(this.pathCount > 0) {
        var path = this.dataArray[this.dataArray.length - this.pathCount];
        
        this.pathArray.push(Path.Validate(path));
        
        this.pathCount--;
    }
};

PatternMatcher.outputMatches = function() {
    console.log(this.patternArray, this.pathArray);
};
 
var args = process.argv.splice(2);

console.log(args);
 
if (args.length < 1) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}
 
// Read the file and print its contents.
var fs = require('fs'),
    filename = args[0];
 
fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    PatternMatcher.init(data);
    
    PatternMatcher.outputMatches();
});