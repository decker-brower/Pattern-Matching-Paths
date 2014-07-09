(function(exports) {
    'use strict';
    
    var Matcher = module.exports = {};
    
    Matcher.findMatches = function(pathArray, patternArray) {
        var _self = this;
        var resultArray = [];

        pathArray.forEach(function(path) {
            var matchString = "NO MATCH";
            
            patternArray.forEach(function(pattern) {
                if(_self.isMatch(path, pattern))
                    matchString = pattern;
            });
            
            resultArray.push(matchString);
        });
        
        return resultArray;
    };
    
    Matcher.isMatch = function(path, pattern) {
        var pathParts = path.split('/');
        var patternParts = pattern.split(',');
        var pathCount = pathParts.length;
        var patternCount = patternParts.length;
        var i = 0;

        if(pathCount !== patternCount)
            return false;
        
        while(i < pathCount) {
            if(pathParts[i] !== patternParts[i] && patternParts[i] !== "*")
                return false;

            i++;
        }
        
        return true;
    };
    
}(typeof exports === 'object' && exports || this));