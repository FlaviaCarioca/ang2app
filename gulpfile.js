var gulp = require('gulp'),
    rename = require('gulp-rename'),
    traceur = require('gulp-traceur'),
    webserver = require('gulp-webserver'),
    livereload = require('gulp-livereload'),
    tslint = require('gulp-tslint')
    typescript = require('gulp-typescript');

// run init tasks
gulp.task('default', ['dependencies', 'js', 'html', 'css']);

// run development task
gulp.task('dev', ['watch', 'serve']);

// serve the build dir
gulp.task('serve', function () {
  gulp.src('build')
    .pipe(webserver({
      open: true
    }));
});

// compile typescript
gulp.task('compile', function () {
    // gulp.src('src/**/*.ts')
    //     .pipe(tscompiler({ emitError: false }))
    gulp.src(['src/**/*.ts'])
        .pipe(typescript({module: 'commonjs'})).js
        .pipe(gulp.dest('build'))
        .pipe(livereload());
});

// watch for changes and run the relevant task
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('src/**/*.ts', ['compile']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.css', ['css']);
});

// move dependencies into build dir
gulp.task('dependencies', function () {
  return gulp.src([
    'vendor/dist/semantic.min.css',
    'node_modules/traceur/bin/traceur-runtime.js',
    'node_modules/es6-shim/es6-shim.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/angular2/bundles/angular2.dev.js'
  ])
    .pipe(gulp.dest('build/lib'));
});

// lint the code
gulp.task('tslint', function () {
    gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose'))
});

// transpile & move js
gulp.task('js', function () {
  return gulp.src('src/**/*.ts')
    .pipe(rename({
      extname: ''
    }))
    .pipe(traceur({
      modules: 'instantiate',
      moduleName: true,
      annotations: true,
      types: true,
      memberVariables: true
    }))
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest('build'))
    .pipe(livereload());
});

// move html
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'))
    .pipe(livereload());
});

// move css
gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('build'))
    .pipe(livereload());
});
