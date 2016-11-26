'use strict';

var gulp = require('gulp');
var critical = require('critical');


// Generate & Inline Critical-path CSS
gulp.task('critical', function (cb) {
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
