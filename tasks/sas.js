/*
 * grunt-sas
 * https://github.com/andraaspar/grunt-sas
 *
 * Copyright (c) 2014 András Parditka
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	grunt.registerMultiTask('sas', 'Gathers bower dependencies\' src contents to the lib folder.', function() {
		
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-copy');
		
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			depFolderPattern: 'bower_components/*',
			versionsFileName: 'versions.txt',
			srcName: 'src',
			libName: 'lib',
			tmpName: 'tmp',
			cleanEntireLib: true,
			cleanFilesToCopy: true
		});
		
		var depFolders = grunt.file.expand(options.depFolderPattern);
		var copyFiles = [];
		var cleanFiles = [];
		
		function prefixWithLibName(value, index, arr) {
			arr[index] = options.libName + '/' + value;
		}
		
		var versions = '';
		for (var i = 0; i < depFolders.length; i++) {
			if (!options.cleanEntireLib && options.cleanFilesToCopy) {
				// Gather file names in dependency folder's src
				var fileNames = grunt.file.expand({cwd: depFolders[i] + '/' + options.srcName}, '*');
				fileNames.forEach(prefixWithLibName);
				// Add file names to list of files to clean
				cleanFiles = cleanFiles.concat(fileNames);
			}
			
			var bowerFileName = depFolders[i] + '/bower.json';
			if (grunt.file.exists(bowerFileName)) {
				var bowerFileJSON = grunt.file.readJSON(bowerFileName);
				// Read dependency name & version from bower.json, and put it into the versions file
				versions += bowerFileJSON.name + ' ' + bowerFileJSON.version + '\n';
			}
			
			// Add files from dependency folder's src to the list of files to copy to lib
			copyFiles.push({expand: true, cwd: depFolders[i] + '/' + options.srcName, src: ['**/*'], dest: options.libName + '/'});
		}
		
		// Write versions file to temporary folder
		grunt.file.write(options.tmpName + '/' + options.versionsFileName, versions);
		// Schedule versions file to be copied to its final location
		copyFiles.push({expand: true, cwd: options.tmpName, src: [options.versionsFileName], dest: options.libName + '/'});
		
		if (options.cleanEntireLib) {
			cleanFiles = [options.libName + '/*'];
		}
		
		grunt.config.set('clean', {
			sas: cleanFiles
		});
		grunt.config.set('copy', {
			sas: {
				files: copyFiles
			}
		});
		
		grunt.task.run(['clean:sas', 'copy:sas']);
	});

};
