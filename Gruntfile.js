/* jshint node: true */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        
        // Metadata.
        pkg: grunt.file.readJSON("package.json"),
        
        // Task configuration.
        concat: {
            patternMatcher: {
                src: [
                    "PatternMatcher.js"
                ],
                dest: "dist/PatternMatcher.js"
            }
        },
        jshint: {
             files: [
                 "*.js",
                 "lib/**/*.js",
                 "test/**/*.js"
            ]
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/mocha/*.js']
            }
        },
        uglify: {
            PatternMatcher: {
                files: {
                    "dist/PatternMatcher.min.js": ["dist/PatternMatcher.js"]
                }
            }
        }
    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-mocha-test');


    // Test task.
    grunt.registerTask("test", ["mochaTest", "jshint"]);

    // Full distribution task.
    grunt.registerTask("dist", ["concat", "uglify"]);

    // Default task.
    grunt.registerTask("default", ["dist"]);
};
