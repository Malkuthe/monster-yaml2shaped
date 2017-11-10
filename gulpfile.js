var gulp = require('gulp');
var shaped = require('gulp-5e-shaped-monster');
var concat = require('gulp-concat-util');
var watch  = require('gulp-watch');
var beautify = require('gulp-beautify');
var cache = require('gulp-cached');
var props = require('./5e-shaped-monster-config.json');

gulp.task('compile',function() {
  return gulp.src(props.paths.src)
         .pipe(cache('monster')) 
         .pipe(shaped({schema: 'DEFAULT_SAFE_SCHEMA'}))
         .pipe(concat('monsters.js',{newLine: ","}))
         .pipe(concat.header("on('ready', function() { ShapedScripts.addEntities({ \"name\": \"Monsters\", \"version\": \"2.0.0\", \"monsters\": ["))
         .pipe(concat.footer("]})});"))
         .pipe(beautify({indent_size:2}))
         .pipe(gulp.dest(props.paths.dest));
});

gulp.task('default', function() {
  return gulp.watch(( props.paths.watch ? props.paths.watch : props.paths.src),['compile']);
})