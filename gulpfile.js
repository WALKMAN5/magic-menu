'use strict'

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    uglifyjs = require('gulp-uglifyjs'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

var path = {
  dev: {
    styles: 'dev/styles/*.*',
    scss: 'dev/styles/',
    scripts: 'dev/scripts/*.*',
    templates: 'dev/templates/*.*',
    demo: 'dev/demo/*.*'
  },
  public: {
    css: 'public/css',
    js: 'public/js/',
    demo: 'public/demo/'
  },
  baseDir: 'public/'
}
var config = {
    server: {
        baseDir: path.baseDir
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Alex"
};

gulp.task('styles', function(){
  gulp.src(path.dev.styles)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includesPaths: [path.dev.scss]
    }).on('error', sass.logError))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.public.css))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', function(){
  gulp.src(path.dev.scripts)
    .pipe(sourcemaps.init())
    .pipe(uglifyjs().on('error', gutil.log))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.public.js))
    .pipe(reload({stream: true}));
});

gulp.task('demo', function(){
  gulp.src(path.dev.demo)
    .pipe(gulp.dest(path.public.demo))
    .pipe(reload({stream: true}));
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('watch', function(){
  gulp.watch(path.dev.scripts, ['scripts']);
  gulp.watch(path.dev.styles, ['styles']);
  gulp.watch(path.dev.demo, ['demo']);
})

gulp.task('default', ['styles', 'scripts', 'demo', 'watch', 'webserver']);
