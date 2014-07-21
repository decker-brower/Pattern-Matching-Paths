/*jslint node: true */
(function(exports) {
    "use strict";
    
    function Pattern(pattern) {
        var wildCardCount = pattern.match(/\*/g);
        
        this.value = this.Validate(pattern);
        this.wildCardCount = wildCardCount === null ? 0 : wildCardCount.length,
        this.partsArray = this.value.split(",");
        this.score = this.getScore();
    };
    
    //method to validate patterns
    Pattern.prototype.Validate = function(pattern) {
        if(pattern === "") {
            console.log("Invalid pattern: patterns cannot be an empty string");
            process.exit(1);
        }
        
        var validPattern = this.stripExtraCommas(pattern);
        
        return validPattern;
    };
    
    //method to strip extra commas from patterns
    Pattern.prototype.stripExtraCommas = function(pattern) {
        //check if the pattern has a leading comma and strip it if so
        if(pattern.substr(0, 1) === ",")
            pattern = pattern.substr(1, pattern.length);
        
        //check if the pattern has a trailing comma and strip it if so
        if(pattern.substr(-1) === ",")
            pattern = pattern.substr(0, pattern.length -1);

        return pattern;
    };
    
    Pattern.prototype.getScore = function() {
        var i = this.partsArray.length;
        var score = 0;
        
        this.partsArray.reverse();
        
        while(i--) {
            if(this.partsArray[i] === "*")
                score -= 10 + i;
        }
        
        this.partsArray.reverse();
        
        return score;
    };
    
    // The module to be exported.
    module.exports = Pattern;
}(typeof exports === "object" && exports || this));