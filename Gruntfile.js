module.exports = function(grunt) {
	gruntConfig = {
		coffee: {
			back: {
				expand: true,
				cwd: 'src/back',
				src: ['**/*.coffee'],
				dest: 'bin/back',
				ext: '.js',
				options: {
					bare: true
				}
			},
			front: {
				expand: true,
				cwd: 'src/front',
				src: ['**/*.coffee'],
				dest: 'bin/front-tmp',
				ext: '.js',
				options: {
					bare: true
				}
			}
		},
		bower: {
			install: {
				options: {
					copy: false
				}
			}
		},
		browserify: {
			front: {
				src: './bin/front-tmp/app/app.js',
				dest: './bin/front/app.js'
			}
		},
		less: {
			style: {
				options: {
					paths: ["assets/css"],
					cleancss: true
				},
				files: {
					"bin/front/style/main.css": "src/front/style/main.less"
				}
			}
		},
		copy: {
			front: {
				expand: true,
				cwd: 'src/front',
				src: ['**/*', '!**/*.coffee', '!**/*.less'],
				dest: 'bin/front'
			}
		},
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			backcoffee: {
				files: ['src/back/**/*.coffee'],
				tasks: ['coffee:back']
			},
			frontcoffee: {
				files: ['src/front/**/*.coffee'],
				tasks: ['coffee', 'browserify']
			},
			frontfiles: {
				files: ['src/front/**/*', '!**/*.coffee', '!**/*.less'],
				tasks: ['copy']
			},
			frontstyle: {
				files: ['src/front/**/*.less'],
				tasks: ['less']
			}
		},
		nodemon: {
			dev: {
				script: './index.js'
			}
		},
		concurrent: {
			target: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		// Automatically inject Bower components into the app
		wiredep: {
			task: {
				src: [
					'src/front/**/*.html',
				],
				options: {
					cwd: ''
				}
			}
		}
	}

	grunt.initConfig(gruntConfig);

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-bower-task');

	// Default task(s).
	grunt.registerTask('default', ['coffee', 'bower', 'wiredep', 'browserify', 'less', 'copy']);
	grunt.registerTask('server', ['coffee', 'bower', 'wiredep', 'browserify', 'less', 'copy', 'concurrent']);
}
