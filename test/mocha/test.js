/*jslint node: true */
var expect = require('chai').expect;
var PatternMatcher = require("../../lib/util/PatternMatcher");
var Path = require("../../lib/util/Path");
var Pattern = require("../../lib/util/Pattern");
var BinarySearchTree = require("../../lib/util/BinarySearchTree");

describe("PatternMatchingPaths", function() {
    
    //test the Path.js module
    describe("Path", function() {
        var pathObj = new Path("blah");
        
        describe("Path.Validate", function() {
            it("should return a valid path", function() {
                var path = pathObj.Validate("/bl/ah/");
                
                expect(path.substr(0, 1)).to.equal("b");
                expect(path.substr(-1)).to.equal("h");
            });
        });
        
        describe("Path.stripExtraSlashes", function() {
            it("should strip leading/trailing slashes from a string", function() {
                expect(pathObj.stripExtraSlashes("/bl/ah/")).to.equal("bl/ah");
            });
        });
    });
    
    //test the Pattern.js module
    describe("Pattern", function() {
        var patternObj = new Pattern("blah");

        describe("Pattern.Validate", function() {
            it("should return a valid pattern", function() {
                var pattern = patternObj.Validate(",bl,ah,");
                
                expect(pattern.substr(0, 1)).to.equal("b");
                expect(pattern.substr(-1)).to.equal("h");
            });
        });

        describe("Pattern.stripExtraCommas", function() {
            it("should strip leading/trailing commas from a string", function() {
                expect(patternObj.stripExtraCommas(",bl,ah,")).to.equal("bl,ah");
            });
        });
        
        describe("Pattern.getScore", function() {
            it("should return an int based on the number of wild cards in the pattern", function() {
                var pattern1 = new Pattern("w,x,*,*");
                var pattern2 = new Pattern("*,x,y,z");
                
                expect(pattern2.score).to.be.above(pattern1.score);
            });
        });
    });
    
    //test the BinarySearchTree.js module
    describe("BinarySearchTree", function() {
        
        it("should have a _root node", function() {
            expect(new BinarySearchTree()).to.have.property("_root");
        });
        
        describe("BinarySearchTree.add", function() {
            
            it("should add a pattern object to the tree", function() {
                var tree = new BinarySearchTree();
                var pattern = new Pattern("w,x,*,*");

                tree.add(pattern);

                expect(tree._root).to.have.property("patternObjArray").that.is.an("array");
                expect(tree._root).to.have.property("left").that.equals(null);
                expect(tree._root).to.have.property("right").that.equals(null);
                expect(tree._root).to.have.property("partsCount").that.equals(4);
            });
        });

        describe("BinarySearchTree.contains", function() {
            it("should return the pattern or NO MATCH if the tree contains a pattern that matches the given path", 
                function() {
                    var tree = new BinarySearchTree();
                    var pattern = new Pattern("w,x,*,*");
                    var path1 = new Path("w/x/y/z");
                    var path2 = new Path("asd/fgh/jkl");

                    tree.add(pattern);

                    expect(tree.contains(path1)).to.equal(pattern.value);
                    expect(tree.contains(path2)).to.equal("NO MATCH");
            });
        });
    });
});