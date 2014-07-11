(function(exports) {
    'use strict';
    
    // The module to be exported.
    var Matcher = module.exports = {};
    //import the Pattern module
    var Pattern = require("./Pattern");
    //import the Path module
    var Path = require("./Path");
    
    Matcher.findMatches = function(pathArray, patternArray) {
        //cache a reference to this object for easy access to methods in the forEach loops
        var _self = this;
        //the array or matching patterns to return
        var resultArray = [];
        var pathCount = pathArray.length - 1;
        var patternCount = patternArray.length - 1;

        //loop through the path array to find matching patterns for each path
        while(pathCount >= 0) {
            //validate the path
            var validPath = Path.Validate(pathArray[pathCount]);
            //set the default result to NO MATCH
            var matchString = "NO MATCH";
            //an array to hold all matching patterns
            var matchArray = [];
            //reset the pattern count
            var i = patternCount;
            
            //loop through the pattern array to check for patterns that match this path
            while(i >= 0) {
                //validate the pattern
                var validPattern = Pattern.Validate(patternArray[i]);
                
                var matchObj = _self.getMatchObj(validPath, validPattern);
                //if the pattern matches then push it into the matching patterns array
                if(matchObj.isMatch)
                    matchArray.push(matchObj);
                
                i--;
            }
            
            //if more than one pattern matches then find the best one.
            //else we only have one match so use that one.
            if(matchArray.length > 1)
                matchString = matchArray.sort(this.sortMatchObjs)[0].pattern;
            else if(matchArray.length > 0)
                matchString = matchArray[0].pattern;

            //push the match string into the result array
            resultArray.push(matchString);

            pathCount--;
        }
        
        return resultArray;
    };
    
    //js linter doesn't like array.sort(function(a,b) {}) so put the function here instead
    Matcher.sortMatchObjs = function(a, b) {
        return b.score - a.score;
    };
    
    //method to check if a given pattern matches a given path
    Matcher.getMatchObj = function(path, pattern) {
        //split the path parts into an array
        var pathParts = path.split("/");
        //split the pattern parts into an array
        var patternParts = pattern.split(",");
        //cache the number of parth parts
        var pathCount = pathParts.length;
        //cache the number of pattern parts
        var patternCount = patternParts.length;
        //object to return
        var matchObj = { score: 0, pattern: pattern, isMatch: true };
        //set the loop counter to zero so we can read from left to right
        var i = 0;

        //if the path isn't the same length as the pattern then they don't match
        if(pathCount !== patternCount)
            return false;
        
        //reverse the parts so that the score system works right
        patternParts.reverse();
        pathParts.reverse();
        //loop through the path and pattern parts to compare them
        while(i < pathCount) {
            //if the parts are not the same and if the pattern is NOT a wildcard 
            //then they don't match
            if(pathParts[i] !== patternParts[i] && patternParts[i] !== "*")
                matchObj.isMatch = false;
            
            //minus 10 + the index for every wild card
            //the farther to the left a wild card is the lower the score becomes
            if(patternParts[i] === "*")
                matchObj.score -= 10 + i;
            
            //if we get this far then the parts match so move to the next part
            i++;
        }
        
        return matchObj;
    };
    
}(typeof exports === 'object' && exports || this));