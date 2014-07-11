/* jshint node: true */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        
        // Metadata.
        pkg: grunt.file.readJSON("package.json"),
        
        // Task configuration.
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
        }
    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-mocha-test');


    // Test task.
    grunt.registerTask("test", ["mochaTest", "jshint"]);

    // Default task.
    grunt.registerTask("default", ["test"]);
};
