module.exports = function(grunt) {

	var cfg = grunt.file.readJSON('grunt_config.json');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		haml: {
			dist: {
				files: [
        {
          expand: true,     // Enable dynamic expansion.
          cwd: '',      		// Src matches are relative to this path.
          src: ['*.haml'], 	// Actual pattern(s) to match.
          dest: '',   			// Destination path prefix.
          ext: '.html',   	// Dest filepaths will have this extension.
        },
      ],
			}
		},

		sass: {
	    dist: {
	      files: [{
	        expand: true,
	        cwd: 'sass',
	        src: ['*.scss'],
	        dest: cfg.cssPath,
	        ext: '.css'
	      }]
	    }
	  },

		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 9']
			},
			execute: {
				files: [{
	        expand: true,
	        cwd: cfg.cssPath,
	        src: ['*.css'],
	        dest: cfg.cssPath,
	        ext: '.css'
	      }]
			},
		},

		// Options documentation here: http://www.jshint.com/docs/options/
		jshint: {
			// defaults
			options: {
				immed       : true,		// prohibit use of immediate function calls without wrapping parens: function() {}() must be (function() {})();
				latedef     : true,		// prohibit use of variables before they are defined in the given scope.
				noarg       : true,		// prohibit use of arguments.caller and arguments.callee.
				noempty     : true,		// prohibits empty blocks of code: { }
				nonbsp      : true,		// prohibits non-breaking whitespace characters in script files.
				nonew       : true,		// prohibit calls to a constructor without assignment: new MyConstructor();
				undef       : false,		// prohibit use of explicitly undeclared variables
				unused      : false,		// warn when a variable is defined, but not used. Keeps code clean.
				strict      : false,		// require 'use strict' in all functions. Note, this can be implemented with a single wrapper function on a script. Do not call 'use script' in the global scope. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
				//lastsemic : true,	// suppresses warnings about missing semi-colons after the last line of code in any block.
				//shadow    : true,		// suppresses warnings about variable shadowing (redeclaring a variable in an inner scope)

				// packaged globals
				browser     : true,
				jquery      : true,

				// custom globals
				globals: {			// specify globals to include (true = assignable)
					gruntImport: false
				},
			},

			// merge the following into the above defaults for debug mode
			debug: {
				options: {
					devel: true
				},
				files: {
					src: [ cfg.jsPath + '/**/*.js' ]
				}
			}
		},

		// includes are used to merge JS files
		includes: {
			options: {
				includeRegexp: /^(\s*)gruntImport\(['"]([^'"]+)['"]\);/
			},
			debug: {
				options: {
					debug: true
				},
				files: [{
					src  : [ cfg.jsPath + '/main.js' ],
					dest : cfg.jsPath + '/main.min.js',
					flatten: true
				}]
			}
		},

		// This lets us set variables like @@cssPath in files
		includereplace: {
		  normal: {
		    options: {
		      globals: {
		        img: 'normal',
		        person : 'Grandma'
		      },
		    },
		    src: [ 'index.html' ],
		    dest: 'normal.html'
		  },
		  goofy: {
		    options: {
		      globals: {
		        img: 'goofy',
		        person: 'Uncle Daryl'
		      },
		    },
		    src: [ 'index.html' ],
		    dest: 'goofy.html'
		  }
		},

		watch: {
			scripts: {
				files: ['*.haml','sass/*.scss','sass/*/*.scss','sass/*/*/*.scss','*.js','js/*.js','js/*/*.js'],
				tasks: ['default'],
				options: {
					spawn: false,
				},
			}
		}

	});

	// Loading up the tasks from above
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-haml');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');


	grunt.registerTask('default', ['haml', 'sass', 'autoprefixer', 'jshint', 'includes:debug', 'includereplace', 'watch']);
	grunt.registerTask('design', ['haml', 'sass', 'autoprefixer', 'includereplace', 'watch']);


};












