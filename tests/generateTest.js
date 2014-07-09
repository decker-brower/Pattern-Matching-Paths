#!/usr/bin/env node

// The module to be exported.
var Generator = module.exports = {};

Generator.init = function(patternCount, pathCount) {
    this.patternCount = patternCount;
    this.pathCount = pathCount;
    this.characters = "qwertyuiopasdfghjklzxcvbnm";
    this.patternArray = [];
    this.pathArray = [];
};

Generator.createNewTest = function() {
    this.test = this.patternCount + "\n";
    
    this.test += this.getPatterns();

    this.test += this.pathCount + "\n";

    this.test += this.getPaths();
};

Generator.getPatterns = function() {
    var patterns = "";
    var i = this.patternCount;
    
    while(i--) {
        this.patternArray.push(this.getRandomPattern());
    }
    
    var cleanArray = this.cleanArray(this.patternArray);
    
    cleanArray.forEach(function(pattern) {
        patterns += pattern;
    });

    return patterns;
};

Generator.getRandomPattern = function() {
    var random1 = this.getRandomInt(1, 6);
    var pattern = "";
    var random2;
    var char;
    
    while(random1--) {
        random2 = this.getRandomInt(1, 12);
        
        while(random2--) {
            char = this.characters[this.getRandomInt(0, this.characters.length - 1)];
            
            pattern += char;
        }
        
        pattern += "/";
    }
    
    return pattern + "\n";
};

Generator.getPaths = function() {
    var paths = "";
    var i = this.pathCount;
    
    while(i--) {
        this.pathArray.push(this.getRandomPath());
    }
    
    var cleanArray = this.cleanArray(this.pathArray);
    
    cleanArray.forEach(function(path) {
        paths += path;
    });
    
    return paths;
};

Generator.getRandomPath = function() {
    var random1 = this.getRandomInt(1, 6);
    var path = "";
    var random2;
    var char;
    
    while(random1--) {
        random2 = this.getRandomInt(1, 12);
        while(random2--) {
            char = this.characters[this.getRandomInt(0, this.characters.length - 1)];
            
            path += char;
        }
        
        path += ",";
    }
    
    return path + "\n";
};

// Get a random integer between a min a max range
Generator.getRandomInt = function(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//method to make sure all elements in an array are unique
Generator.cleanArray = function(a) {
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
};

//get the arguments we care about
var args = process.argv.splice(2);

//if invalid number of arguments were given then display a helpful error message and kill the process
if (args.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME NUMBEROFPATTERNS NUMBEROFPATHS');
  process.exit(1);
}

Generator.init(args[1], args[2]);
Generator.createNewTest();

var fs = require('fs');
fs.writeFile(args[0], Generator.test, function(err) {
    if (err) throw err;
    
    console.log("Test case " + args[0] + " was created.");
});