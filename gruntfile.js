// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  "use strict";
  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'compressed',
          sourcemap: 'none',
          //loadPath: require('node-bourbon').includePaths
        },
        files: {                         // Dictionary of files
          'dist/assets/css/app.css': 'src/assets/css/app.scss'
        }
      }
    },
    autoprefixer:{
      dist:{
        files:{
          'dist/assets/css/app.css':'dist/assets/css/app.css'
        }
      }
    },

    bake: {
        build: {
            options: {},
            files: {
              'dist/index.html': 'src/index.html',
              'dist/wedding-details/index.html': 'src/wedding-details/index.html',
              'dist/book-travel/index.html': 'src/book-travel/index.html',
              'dist/registry/index.html': 'src/registry/index.html',
              'dist/rsvp/index.html': 'src/rsvp/index.html'
            }
        }
    },


    uglify: {
      options: {
        sourceMap: false
      },
      my_target: {
        files: {
          'dist/assets/js/locations.js': 'src/assets/js/locations.js'
        }
      }
    },

    copy: {
      images: {
        cwd: 'images/',  // set working folder / root to copy
        src: '**/*',           // copy all files and subfolders
        dest: 'dist/assets/img/',    // destination folder
        expand: true           // required when using cwd
      },
      css: {
        cwd: 'src/assets/css/',  // set working folder / root to copy
        src: '**/*.css',           // copy all files and subfolders
        dest: 'dist/assets/css/',    // destination folder
        expand: true           // required when using cwd
      },
      js: {
        cwd: 'src/assets/js/vendor/',  // set working folder / root to copy
        src: '**/*.js',           // copy all files and subfolders
        dest: 'dist/assets/js/vendor/',    // destination folder
        expand: true           // required when using cwd
      },
      json: {
        cwd: 'src/assets/js/',  // set working folder / root to copy
        src: '**/*.json',           // copy all files and subfolders
        dest: 'dist/assets/js/',    // destination folder
        expand: true           // required when using cwd
      },
      // cssBuild: {
      //   cwd: 'src/assets/css/',  // set working folder / root to copy
      //   src: '**/*.css',           // copy all files and subfolders
      //   dest: 'build/App_Themes/~Site_Name~/',    // destination folder
      //   expand: true           // required when using cwd
      // },
      // jsBuild: {
      //   cwd: 'src/assets/js/vendor/',  // set working folder / root to copy
      //   src: '**/*.js',           // copy all files and subfolders
      //   dest: 'build/CMSScripts/Custom/vendor/',    // destination folder
      //   expand: true           // required when using cwd
      // }
    },

    watch: {
      sass: {
        files: ['src/assets/css/*.scss'],
        tasks: ['sass', 'autoprefixer'],
        options : { nospawn : true, relative:true }
      },
      bake: {
        files: ['src/**/*.html', 'src/*.html', 'includes/*.html'],
        tasks: ['bake']
      },
      copy: {
        files: ['images/**/*.jpg','images/*.jpg','images/*.svg', 'src/assets/js/vendor/*.js', 'src/assets/css/*.css', 'src/assets/js/*.json'],
        tasks: ['copy']
      },
      uglify: {
        files: ['src/assets/js/*.js', 'src/freetrade/assets/js/*.js'],
        tasks: ['uglify']
      }
    },

    touch: {
      target: ['*.html']
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'dist/assets/js/*.js',
            'dist/assets/css/*.css',
            'dist/**/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: './dist',
          port: '7779'
        }
      }
    }

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bake');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-touch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', ['browserSync', 'watch']);
};
