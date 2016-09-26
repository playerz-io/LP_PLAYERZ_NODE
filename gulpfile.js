'use strict';

let gulp = require('gulp');
let uglify = require('gulp-uglifyjs');
let rename = require('gulp-rename');
let ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps')


gulp.task('uglify', function() {
    gulp.src('./public/*.js')
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'))
});
