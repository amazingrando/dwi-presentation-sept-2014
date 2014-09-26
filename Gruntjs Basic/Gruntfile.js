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
	grunt.loadNpmTasks('grunt-contrib-haml');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');


	grunt.registerTask('default', ['haml', 'sass', 'autoprefixer', 'watch']);


};












