/*
 * grunt-sas
 * https://github.com/andraaspar/grunt-sas
 *
 * Copyright (c) 2014 András Parditka
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['lib', 'lib2', 'tmp']
		},

		// Configuration to be run (and then tested).
		sas: {
			default_options: {
				options: {
				}
			},
			custom_options: {
				options: {
					depFolderPattern: 'bower_components_2/*',
					srcName: 'source',
					libName: 'lib2',
					cleanEntireLib: true,
					cleanFilesToCopy: true
				}
			},
			custom_options_2: {
				options: {
					depFolderPattern: 'bower_components_3/*',
					libName: 'lib2',
					cleanEntireLib: false
				}
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'sas', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
