#!/usr/bin/env node

// The module to be exported.
var PatternMatcher = module.exports = {};
//import the Pattern module
var Pattern = require("./util/Pattern");
//import the Path module
var Path = require("./util/Path");

//method to initialize the PatternMatcher
PatternMatcher.init = function(data) {
    //split the file input into an array of strings
    this.dataArray = data.split("\n");
    //the patterns
    this.patternArray = [];
    //the paths
    this.pathArray = [];
    //get the pattern count
    this.patternCount = parseInt(this.dataArray[0]);
    //get the path count
    this.pathCount = this.dataArray[this.patternCount + 1];
    
    //loop through the patterns
    while(this.patternCount > 0) {
        //get the pattern
        var pattern = this.dataArray[this.patternCount];
        //validate and push the pattern into the pattern array
        this.patternArray.push(Pattern.Validate(pattern));
        //decrement the loop counter
        this.patternCount--;
    }

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
    console.log(this.patternArray, this.pathArray);
};

//get the arguments we care about
var args = process.argv.splice(2);

console.log(args);

//if no arguments were given then display a helpful error message and kill the process
if (args.length < 1) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}
 
// import the file system module and cache the filename
var fs = require('fs'),
    filename = args[0];
 
fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    //initialize the PatternMatcher
    PatternMatcher.init(data);
    //log the matches
    PatternMatcher.outputMatches();
});