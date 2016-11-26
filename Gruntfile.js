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
          base: 'lab/frontend-nanodegree-mobile-portfolio/',
          css: [
            'lab/frontend-nanodegree-mobile-portfolio/css/style.css',
            'lab/frontend-nanodegree-mobile-portfolio/css/print.css'
          ],
          inline: true,
          //minify: true,
          extract: true,
          ignore: '@font-face',
          width: 1440,
          height: 400
        },
        src: 'lab/frontend-nanodegree-mobile-portfolio/index.html',
        dest: 'lab/frontend-nanodegree-mobile-portfolio/index-critical2.html'
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-critical');

  grunt.registerTask('start', ['express','watch']);
};
