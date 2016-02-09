'use strict';
    
module.exports = function(grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), 
    watch: {
      js: {
        files: ['gruntfile.js', 'lib/*.js', 'example/*.js'],
        tasks: ['jshint'],
      },
    },
    jshint: {
      all: {
        src: ['gruntfile.js', 'lib/*.js', 'example/*.js'],
        options: {
          jshintrc: true
        }
      }
    } 
  });

  //Load NPM tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');  
  
  grunt.registerTask('default', ['watch']);
};