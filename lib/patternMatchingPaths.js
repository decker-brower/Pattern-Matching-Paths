#!/usr/bin/env node

//if no arguments were given then display a helpful error message and kill the process
if (args.length < 2) {
  console.log('Usage: node ' + process.argv[1] + ' INPUTFILENAME OUTPUTFILENAME');
  process.exit(1);
}

//import the file system module
var fs = require('fs');
//import the PatternMatcher module
var PatternMatcher = require("./util/PatternMatcher");
//get the arguments we care about
var args = process.argv.splice(2);
//cache the filenames
var inputFilename = args[0];
var outputFilename = args[1];
 
fs.readFile(inputFilename, 'utf8', function(err, data) {
    if (err) throw err;
    //initialize the PatternMatcher
    PatternMatcher.init(data);
    
    fs.writeFile(outputFilename, PatternMatcher.outputMatches(), function(err) {
        if (err) throw err;

        console.log("Results were saved to : " + outputFilename);
    });
});