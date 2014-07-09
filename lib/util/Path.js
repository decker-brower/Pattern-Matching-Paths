(function(exports) {
    'use strict';
    
    // The module to be exported.
    var Path = module.exports = {};
    
    //method to validate paths
    Path.Validate = function(path) {
        return this.stripExtraSlashes(path);
    };
    
    //method to strip extra slashes from paths
    Path.stripExtraSlashes = function(path) {
        //check if the path has a leading slash and strip it if so
        if(path.substr(0, 1) === "/")
            path = path.substr(1, path.length);
        
        //check if the path has a trailing slash and strip it if so
        if(path.substr(-1) === "/")
            path = path.substr(0, path.length -1);

        return path;
    };
    
}(typeof exports === 'object' && exports || this));