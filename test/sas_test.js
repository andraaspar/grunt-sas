'use strict';

var grunt = require('grunt');

/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

exports.sas = {
	setUp: function(done) {
		// setup here if necessary
		done();
	},
	default_options: function(test) {
		test.expect(2);

		var actual1 = grunt.file.read('lib/dep1.txt');
		var expected1 = grunt.file.read('bower_components/dep1/src/dep1.txt');
		test.equal(actual1, expected1, 'Test 1');

		var actual2 = grunt.file.read('lib/dep2/dep2.txt');
		var expected2 = grunt.file.read('bower_components/dep2/src/dep2/dep2.txt');
		test.equal(actual2, expected2, 'Test 2');

		test.done();
	},
	custom_options: function(test) {
		test.expect(1);

		var actual1 = grunt.file.read('lib2/conflict.txt');
		var expected1 = grunt.file.read('bower_components_2/dep2/source/conflict.txt');
		test.equal(actual1, expected1, 'Test 1');

		test.done();
	},
	custom_options_2: function(test) {
		test.expect(3);

		var actual1 = grunt.file.read('lib2/conflict.txt');
		var expected1 = grunt.file.read('bower_components_2/dep2/source/conflict.txt');
		test.equal(actual1, expected1, 'Test 1');

		var actual2 = grunt.file.read('lib2/no-conflict.txt');
		var expected2 = grunt.file.read('bower_components_3/dep1/src/no-conflict.txt');
		test.equal(actual2, expected2, 'Test 2');

		var actual3 = grunt.file.read('lib2/another-conflict.txt');
		var expected3 = grunt.file.read('bower_components_3/dep1/src/another-conflict.txt');
		test.equal(actual3, expected3, 'Test 3');

		test.done();
	}
};
