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
    src: 'index-source.html',
    dest: 'index.html',
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
    src: 'project-2048-source.html',
    dest: 'project-2048.html',
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
    src: 'project-mobile-source.html',
    dest: 'project-mobile.html',
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
    src: 'project-webperf-source.html',
    dest: 'project-webperf.html',
    css: 'css/style.css'
  });
});
