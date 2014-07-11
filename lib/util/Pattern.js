(function(exports) {
    'use strict';
    
    // The module to be exported.
    var Pattern = module.exports = {};
    
    //method to validate patterns
    Pattern.Validate = function(pattern) {
        if(pattern === "") {
            console.log('Invalid pattern: patterns cannot be an empty string');
            process.exit(1);
        }
        
        var validPattern = this.stripExtraCommas(pattern);
        
        return validPattern;
    };
    
    //method to strip extra commas from patterns
    Pattern.stripExtraCommas = function(pattern) {
        //check if the pattern has a leading comma and strip it if so
        if(pattern.substr(0, 1) === ",")
            pattern = pattern.substr(1, pattern.length);
        
        //check if the pattern has a trailing comma and strip it if so
        if(pattern.substr(-1) === ",")
            pattern = pattern.substr(0, pattern.length -1);

        return pattern;
    };
    
}(typeof exports === 'object' && exports || this));