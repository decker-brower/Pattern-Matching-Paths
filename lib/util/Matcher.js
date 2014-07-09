(function(exports) {
    'use strict';
    
    // The module to be exported.
    var Matcher = module.exports = {};
    
    Matcher.findMatches = function(pathArray, patternArray) {
        //cache a reference to this object for easy access to methods in the forEach loops
        var _self = this;
        //the array or matching patterns to return
        var resultArray = [];

        //loop through the path array to find matching patterns for each path
        pathArray.forEach(function(path) {
            //set the default result to NO MATCH
            var matchString = "NO MATCH";
            //an array to hold all matching patterns
            var matchArray = [];
            
            //loop through the pattern array to check for patterns that match this path
            patternArray.forEach(function(pattern) {
                //if the pattern matches then push it into the matching patterns array
                if(_self.isMatch(path, pattern))
                    matchArray.push(pattern);
            });
            
            //if more than one pattern matches then find the best one.
            //else we only have one match so use that one.
            if(matchArray.length > 1)
                matchString = _self.findBestMatch(matchArray);
            else if(matchArray.length > 0)
                matchString = matchArray[0];
            
            //push the match string into the result array
            resultArray.push(matchString);
        });
        
        return resultArray;
    };
    
    //method to check if a given pattern matches a given path
    Matcher.isMatch = function(path, pattern) {
        //split the path parts into an array
        var pathParts = path.split("/");
        //split the pattern parts into an array
        var patternParts = pattern.split(",");
        //cache the number of parth parts
        var pathCount = pathParts.length;
        //cache the number of pattern parts
        var patternCount = patternParts.length;
        //set the loop counter to zero so we can read from left to right
        var i = 0;

        //if the path isn't the same length as the pattern then they don't match
        if(pathCount !== patternCount)
            return false;
        
        //loop through the path and pattern parts to compare them
        while(i < pathCount) {
            //if the parts are not the same and if the pattern is NOT a wildcard 
            //then they don't match
            if(pathParts[i] !== patternParts[i] && patternParts[i] !== "*")
                return false;

            //if we get this far then the parts match so move to the next part
            i++;
        }

        //if we get this far then we have a matching pattern
        return true;
    };
    
    Matcher.findBestMatch = function(patternArray) {
        //cache the number of patterns
        var patternCount = patternArray.length;
        //initialize variable for use in the loops
        var pattern1;
        var pattern2;
        
        //check each pattern against every other pattern
        while(patternCount--) {
            pattern1 = patternArray[patternCount];

            //the inner loop starts at one past the outer loop
			//to ensure efficient one-way testing: A against B but not B against A
            while(patternCount - 1 >= 0) {
                pattern2 = patternArray[patternCount - 1];
                //cache the number of wild cards in each pattern
                var wildCardCount1 = pattern1.split("*").length;
                var wildCardCount2 = pattern2.split("*").length;
                
                if(wildCardCount1 < wildCardCount2)//pattern1 has fewer wild cards
                    return pattern1;
                else if(wildCardCount1 > wildCardCount2)//pattern2 has fewer wild cards
                    return pattern2;
                else if(wildCardCount1 === wildCardCount2) {//same number of wild cards
                    //return the pattern whose first wild card appears farthest to the right
                    if(pattern1.indexOf("*") < pattern2.indexOf("*"))
                        return pattern2;
                    else if(pattern1.indexOf("*") > pattern2.indexOf("*"))
                        return pattern1;
                }
            }
        }
    };
    
}(typeof exports === 'object' && exports || this));