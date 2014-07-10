var assert = require("assert");
var PatternMatcher = require("../../lib/util/PatternMatcher");
var Path = require("../../lib/util/Path");
var Pattern = require("../../lib/util/Pattern");
var Matcher = require("../../lib/util/Matcher");

describe("PatternMatchingPaths", function(){
//    describe("PatternMatcher", function(){
//        describe("PatternMatcher.init", function() {
//            it("should initialize the PatternMatcher", function() {
//                fs.readFile(inputFilename, 'utf8', function(err, data) {
//                    if (err) throw err;
//
//                    PatternMatcher.init(data);
//                    
//                    assert.equal();
//                });
//            });
//        });
//        
//        describe("PatternMatcher.buildPatternArray", function() {
//            it("", function() {
//                assert.equal([], PatternMatcher.buildPatternArray(););
//            });
//        });
//        
//        describe("PatternMatcher.buildPathArray", function() {
//            it("", function() {
//                
//            });
//        });
//        
//        describe("PatternMatcher.outputMatches", function() {
//            it("", function() {
//                
//            });
//        });
//    });
    
    //test the Path.js module
    describe("Path", function() {

        describe("Path.Validate", function() {
            it("should return a valid path", function() {
                var path = Path.Validate("/bl/ah/");
                
                assert.equal("b", path.substr(0, 1));
                assert.equal("h", path.substr(-1));
            });
        });
        
        describe("Path.stripExtraSlashes", function() {
            it("should strip leading/trailing slashes from a string", function() {
                assert.equal("bl/ah", Path.stripExtraSlashes("/bl/ah/"));
            });
        });
    });
    
    //test the Pattern.js module
    describe("Pattern", function() {

        describe("Pattern.Validate", function() {
            it("should return a valid pattern", function() {
                var pattern = Pattern.Validate(",bl,ah,");
                
                assert.equal("b", pattern.substr(0, 1));
                assert.equal("h", pattern.substr(-1));
            });
        });

        describe("Pattern.stripExtraCommas", function() {
            it("should strip leading/trailing commas from a string", function() {
                assert.equal("bl,ah", Pattern.stripExtraCommas(",bl,ah,"));
            });
        });
    });

    //test the Matcher.js module
    describe("Matcher", function() {

        describe("Matcher.findMatches", function() {
            it("should return an array of the best matching patterns for given paths and patterns", function() {
                var pathArray = ["w/x/y/z", "a/b/c", "foo", "foo/bar", "foo/bar/baz"];
                var patternArray = ["*,b,*", "a,*,*", "*,*,c", "foo,bar,baz", "w,x,*,*", "*,x,y,z"];
                var expectedResult = ["*,x,y,z", "a,*,*", "NO MATCH", "NO MATCH", "foo,bar,baz"];
                
                assert.deepEqual(expectedResult, Matcher.findMatches(pathArray, patternArray));
            });
        });
        
        describe("Matcher.isMatch", function() {
            it("should return true or false", function() {
                var goodPattern = "w,x,*,*";
                var badPattern = "w,x,z,y";
                var path = "w/x/y/z";
                
                assert.equal(true, Matcher.isMatch(path, goodPattern));
                assert.equal(false, Matcher.isMatch(path, badPattern));
            });
        });
        
        describe("Matcher.findBestMatch", function() {
            it("should return the best pattern given an array of patterns", function() {
                var patternArray = ["w,x,*,*", "*,x,y,z"];
                
                assert.equal("*,x,y,z", Matcher.findBestMatch(patternArray));
            });
        });
    });
});