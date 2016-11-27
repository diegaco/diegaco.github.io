'use strict';

var gulp = require('gulp');
var critical = require('critical');


// Generate & Inline Critical-path CSS for Index.html
gulp.task('critical-home', function (cb) {
  critical.generate({
    inline: true,
    base: './',
    width: 1440,
    height: 900,
    minify: true,
    src: 'index.html',
    dest: 'index-critical.html',
    css: 'css/style.css'
  });
});


// Generate & Inline Critical-path CSS for project-2048.html
gulp.task('critical-project2048', function (cb) {
  critical.generate({
    inline: true,
    base: './',
    width: 1440,
    height: 900,
    minify: true,
    src: 'project-2048.html',
    dest: 'project-2048-critical.html',
    css: 'css/style.css'
  });
});

// Generate & Inline Critical-path CSS for project-mobile.html
gulp.task('critical-mobile', function (cb) {
  critical.generate({
    inline: true,
    base: './',
    width: 1440,
    height: 900,
    minify: true,
    src: 'project-mobile.html',
    dest: 'project-mobile-critical.html',
    css: 'css/style.css'
  });
});

// Generate & Inline Critical-path CSS for project-webperf.html
gulp.task('critical-webperf', function (cb) {
  critical.generate({
    inline: true,
    base: './',
    width: 1440,
    height: 900,
    minify: true,
    src: 'project-webperf.html',
    dest: 'project-webperf-critical.html',
    css: 'css/style.css'
  });
});
