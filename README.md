# grunt-sas

> Gathers bower dependencies' src contents to the lib folder.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sas --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sas');
```

## The "sas" task

### Overview
In your project's Gruntfile, add a section named `sas` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sas: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.depFolderPattern
Type: `String`
Default value: `'bower_components/*'`

Pattern for matching dependency folders.

#### options.versionsFileName
Type: `String`
Default value: `'versions.txt'`

The name of the versions information file to be written to the lib folder.

#### options.srcName
Type: `String`
Default value: `'src'`

The name of the src folder inside the dependency folder.

#### options.libName
Type: `String`
Default value: `'lib'`

The name of the lib folder to copy dependencies to.

#### options.tmpName
Type: `String`
Default value: `'tmp'`

The name of the temporary folder where the version info will be initially written.

#### options.cleanEntireLib
Type: `Boolean`
Default value: `true`

Whether to clean the entire contents of the lib folder before copying.

#### options.cleanFilesToCopy
Type: `Boolean`
Default value: `true`

Whether to clean the files / folders in lib matching the name of those that will be copied there.

### Usage Examples

#### Simple usage
Copying all bower dependencies from 'bower_components/*/src' to 'lib'.

```js
grunt.initConfig({
  sas: {
    foo: {}
  }
});
```

#### Advanced usage
Copying all bower dependencies from 'external/*/source' to 'library', and not cleaning anything.

```js
grunt.initConfig({
  sas: {
    foo: {
      options: {
        depFolderPattern: 'external/*',
        srcName: 'source',
        libName: 'library',
        cleanEntireLib: false,
        cleanFilesToCopy: false
      }
    }
  }
});
```
