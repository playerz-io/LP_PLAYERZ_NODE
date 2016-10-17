'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')(); //ici on charge tous les plugins de package.json
let gulpsync = require('gulp-sync')(gulp);
var source = './public'; // dossier de travail
var destination = './public/dist'; // dossier à livrer


// Tâche "js" = uglify + concat
gulp.task('js', function() {
    return gulp.src(source + '/assets/js/**/**/*.js')
        .pipe(plugins.uglifyjs()) //minification
        .pipe(plugins.concat('global.min.js')) //concatenation
        .pipe(gulp.dest(destination + '/assets/js/'));
});

// Tâche "img" = Images optimisées
gulp.task('img', function() {
    return gulp.src(source + '/assets/img/*.{jpg,jpeg,gif,svg,png}')
        .pipe(plugins.imagemin()) // optimisation
        .pipe(gulp.dest(destination + '/assets/img'));
});

// Tâche "build" = CSS + autoprefixer + CSScomb + beautify (source -> destination)
gulp.task('css', function() {
    return gulp.src(source + '/assets/css/*.css')
        .pipe(plugins.cssbeautify({
            indent: '  '
        })) //reformate et ré-indent le css
        .pipe(plugins.autoprefixer()) // ajoute les prefixes CSS3
        .pipe(plugins.uncss({
            html: [source + '/views/*.html']
        })) //  supprime les styles css non utilisés
        .pipe(gulp.dest(destination + '/assets/css/'));
});

// Tâche "minify" = minification CSS (destination -> destination)
gulp.task('minify', function() {
    return gulp.src(destination + '/assets/css/*.css')
        .pipe(plugins.csso())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destination + '/assets/css/'));
});

gulp.task('fonts', () => {
    return gulp.src(source + '/assets/fonts/*')
        .pipe(gulp.dest(destination + '/assets/fonts'));
});

//tache "build"
gulp.task('build', ['css']);

//tache "prod" = Build + minify + js + img
gulp.task('prod', gulpsync.sync(['build', 'minify', 'js', 'img', 'fonts']));

//tache "watch" = je surveille *css et js
gulp.task('watch', function() {
    gulp.watch(source + '/assets/css/*.css', ['build']);
    gulp.watch(source + '/assets/js/*.js', ['js']);
    gulp.watch(source + '/assets/img/*', ['img']);
});

//tache par defaut (gulp)
gulp.task('default', ['build']);
