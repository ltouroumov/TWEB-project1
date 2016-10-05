// Grunt tasks

module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
    '* <%= pkg.name %> - v<%= pkg.version %> - MIT LICENSE <%= grunt.template.today("yyyy-mm-dd") %>. \n' +
    '* @author <%= pkg.author %>\n' +
    '*/\n',

    clean: {
      dist: ['src']
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: ['app/modules/**/*.js']
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      base: {
        src: [
          // Angular Project Dependencies,
          'app/app.js',
          'app/app.config.js',
          'app/modules/**/*Module.js',
          'app/modules/**/*Route.js',
          'app/modules/**/*Ctrl.js',
          'app/modules/**/*Service.js',
          'app/modules/**/*Directive.js'
        ],
        dest: 'public/assets/js/<%= pkg.name %>-appbundle.js'
      },
      build: {
        src: [
          // Angular Project Dependencies,
          'node_modules/angular/angular.js',
          'node_modules/angular-resource/angular-resource.js',
          'node_modules/angular-ui-router/release/angular-ui-router.js',
          'node_modules/chart.js/dist/Chart.js',
          'node_modules/angular-chart.js/dist/angular-chart.js'
        ],
        dest: 'public/assets/js/<%= pkg.name %>-angularbundle.js'
      }
    },

    copy: {
      options: {},

      bootstrap: {
        files: [
          { expand: true, cwd: 'node_modules/bootstrap/dist/', src: ['**'], dest: 'public/assets/bootstrap/' }
        ]
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'min'
      },
      base: {
        src: ['<%= concat.base.dest %>'],
        dest: 'public/assets/js/<%= pkg.name %>-angscript.min.js'
      },
      basePlugin: {
        src: [ 'src/plugins/**/*.js' ],
        dest: 'public/assets/js/plugins/',
        expand: true,
        flatten: true,
        ext: '.min.js'
      }
    },

    connect: {
      server: {
        options: {
          keepalive: true,
          port: 4000,
          base: './public',
          hostname: 'localhost',
          debug: true,
          livereload: true,
          open: true
        }
      }
    },
    concurrent: {
      tasks: ['connect', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },

    watch: {
      app: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app'],
        options: {
          livereload: true
        }
      }
    },

    injector: {
      options: {},
      dev: {
        files: {
          'public/index.html': [
            'bower.json',
            'app/app.js',
            'app/app.config.js',
            'app/**/*Module.js',
            'app/**/*Route.js',
            'app/**/*Ctrl.js',
            'app/**/*Service.js',
            'app/**/*Directive.js'
          ]
        }
      },
      production: {
        files: {
          'public/index.html': [
            'public/assets/css/**/*.css',
            'public/assets/js/*.js'
          ]

        }
      }
    },

    ngtemplates: {
      app: {
        src: 'app/modules/**/*.html',
        dest: 'public/assets/js/templates.js',
        options: {
          module: '<%= pkg.name %>',
          root: 'app/',
          standAlone: false
        }
      }
    }



  });

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Making grunt default to force in order not to break the project if something fail.
  grunt.option('force', true);

  grunt.loadNpmTasks('grunt-contrib-copy');

  // Register grunt tasks
  grunt.registerTask("build", [
    "jshint",
    "exec",
    "concat",
    "copy:bootstrap",
    "ngtemplates",
    "injector:production",
    "concurrent",
    "clean"
  ]);

  grunt.registerTask("make", [
    "jshint",
    "concat",
    "copy:bootstrap",
    "ngtemplates",
    "injector:production"
  ]);

  // Development task(s).
  grunt.registerTask('dev', ['injector:dev', 'concurrent']);

};