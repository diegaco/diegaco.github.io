module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/style.css': 'css/main.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: 'index.html'
      },
      css: {
        files: 'css/*.scss',
        tasks: 'sass'
      }
    },
    express: {
      server: {
        options: {
          bases: './',
          port: '9090',
          open: true,
          livereload: true
        }
      }
    },
    critical: {
      test: {
        options: {
          base: './',
          css: [
            'labs/performanceTest/css/style.css'
          ],
          width: 1300,
          height: 900
        },
        src: 'labs/performanceTest/index.html',
        dest: 'labs/performanceTest/index-critical.html'
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-critical');

  grunt.registerTask('start', ['express','watch']);
};
