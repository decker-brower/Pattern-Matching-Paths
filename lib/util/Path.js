/*jslint node: true */
(function(exports) {
    "use strict";
    
    function Path(path) {
        var wildCardCount = path.match(/\*/g);
        
        this.value = this.Validate(path);
        this.wildCardCount = wildCardCount === null ? 0 : wildCardCount.length,
        this.partsArray = this.value.split("/");
    };
    
    //method to validate paths
    Path.prototype.Validate = function(path) {
        if(path === "") {
            console.log("Invalid path: paths cannot be an empty string");
            process.exit(1);
        }
        
        var validPath = this.stripExtraSlashes(path);
        
        return validPath;
    };
    
    //method to strip extra slashes from paths
    Path.prototype.stripExtraSlashes = function(path) {
        //check if the path has a leading slash and strip it if so
        if(path.substr(0, 1) === "/")
            path = path.substr(1, path.length);
        
        //check if the path has a trailing slash and strip it if so
        if(path.substr(-1) === "/")
            path = path.substr(0, path.length -1);

        return path;
    };
    
    // The module to be exported.
    module.exports = Path;
}(typeof exports === "object" && exports || this));