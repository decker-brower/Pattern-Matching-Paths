/*jslint node: true */
(function(exports) {
    "use strict";
    
    function BinarySearchTree() {
        this._root = null;
    };
    
    /**
     * Appends some data to the appropriate point in the tree. If there are no
     * nodes in the tree, the data becomes the root. If there are other nodes
     * in the tree, then the tree must be traversed to find the correct spot
     * for insertion.
     */
    BinarySearchTree.prototype.add = function(patternObj) {
        //create a new item object, place data in
        var node = { 
            patternObjArray: [ patternObj ], 
            left: null,
            right: null,
            partsCount: patternObj.partsArray.length
        };
            
        //used to traverse the structure
        var current;
    
        //special case: no items in the tree yet
        if (this._root === null){
            this._root = node;
        } else {
            current = this._root;
            
            while(true){

                if(patternObj.partsArray.length < current.partsCount) {

                    //if there's no left, then the new node belongs there
                    if (current.left === null){
                        current.left = node;
                        break;
                    } else {                    
                        current = current.left;
                    }

                } else if(patternObj.partsArray.length > current.partsCount) {
                    
                    //if there's no right, then the new node belongs there
                    if (current.right === null){
                        current.right = node;
                        break;
                    } else {                    
                        current = current.right;
                    } 

                //same number of parts
                } else {
                    current.patternObjArray.push(patternObj);
                    
                    break;
                }
            }        
        }
    };
    
    //Determines if the given value is present in the tree.
    BinarySearchTree.prototype.contains = function(pathObj) {
        var found = false,
            matchString = "NO MATCH",
            matches = [],
            current = this._root;
            
        //make sure there's a node to search
        while(!found && current){
            
            if(pathObj.partsArray.length < current.partsCount) {
                current = current.left;
                
            } else if(pathObj.partsArray.length > current.partsCount) {
                current = current.right;
                
            } else {
                var i = current.patternObjArray.length;
                
                found = true;
                
                while(i--) {
                    var n = current.partsCount;
                    var isMatch = true;
                    
                    while(n--) {
                        if(pathObj.partsArray[n] !== current.patternObjArray[i].partsArray[n] &&
                           current.patternObjArray[i].partsArray[n] !== "*"
                          )
                            isMatch = false;
                    }
                    
                    if(isMatch)
                        matches.push(current.patternObjArray[i]);
                }
            }
        }
        
        //if more than one pattern matches then find the best one.
        //else we only have one match so use that one.
        if(matches.length > 1)
            matchString = matches.sort(this.sortMatches)[0].value;
        else if(matches.length > 0)
            matchString = matches[0].value;
        
        return matchString;
    };
    
    //js linter doesn't like array.sort(function(a,b) {}) so put the function here instead
    BinarySearchTree.prototype.sortMatches = function(a, b) {
        return b.score - a.score;
    };
    
    BinarySearchTree.prototype.traverse = function(process) {
        //helper function
        function inOrder(node) {
            if(node){
                
                //traverse the left subtree
                if(node.left !== null){
                    inOrder(node.left);
                }            
                
                //call the process method on this node
                process.call(this, node);
            
                //traverse the right subtree
                if(node.right !== null){
                    inOrder(node.right);
                }
            }        
        }
        
        //start with the root
        inOrder(this._root);
    };

    // The module to be exported.
    module.exports = BinarySearchTree;
}(typeof exports === "object" && exports || this));