var gulp = require('gulp'),
  gulpIf = require('gulp-if'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  babelify = require('babelify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  eslint = require('gulp-eslint'),
  plumber = require('gulp-plumber'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  del = require('del'),
  runSequence = require('run-sequence'),
  connect = require('electron-connect').server.create(),
  packager = require('electron-packager');


gulp.task('clean', function (done) {
  del(['./dist/css', './dist/js']).then(function () {
    done();
  });
});

gulp.task('style', function () {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      require('stylelint')(),
      require('rucksack-css')(),
      require('cssnano')(),
      require('postcss-reporter')()
    ]))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('script', function () {
  var bundler = browserify('src/js/app.jsx', {
    debug: true
  }).transform(babelify, {
    "presets": ["es2015", "react"],
    "plugins": ["transform-object-assign"]
  });

  function rebundle () {
    bundler
      .bundle()
      .on('error', function (err) {
        console.error(err); this.emit('end');
      })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./dist/js'));
  }

  bundler.on('update', function () {
    console.log('-> bundling...');
    rebundle();
  });

  rebundle();
})

gulp.task('lint', function () {
  return gulp
    .src('./src/js/**/*.{js,jsx}')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('serve', function () {
  runSequence('clean', ['lint', 'script', 'style'], connect.start);

  gulp.watch('./main.js', connect.restart);

  gulp.watch(['./src/scss/**/*.scss'], ['style']);
  gulp.watch(['./src/js/**/*.{js,jsx}'], ['script']);
  gulp.watch(['./dist/index.html'], connect.reload);
  gulp.watch(['./dist/**/*.js'], connect.reload);
  gulp.watch(['./dist/**/*.css'], connect.reload);
});

gulp.task('build', function () {
  runSequence('clean', ['lint', 'script', 'style']);
});


gulp.task('package', ['build'], function (done) {
  packager({
    dir: './',
    out: './',
    name: 'tubehead',
    arch: 'x64',
    platform: 'darwin',
    version: '0.36.0',
    icon: './icons/tubehead.icns',
    overwrite: true,
    asar: true,
    prune: true,
    'app-version': require('./package.json').version,
    ignore: [
      'src',
      'node_modules/babel-eslint',
      'node_modules/babel-plugin-transform-object-assign',
      'node_modules/babel-preset-es2015',
      'node_modules/babel-preset-react',
      'node_modules/babelify',
      'node_modules/cssnano',
      'node_modules/del',
      'node_modules/electron-debug',
      'node_modules/electron-connect',
      'node_modules/eslint-config-makotot',
      'node_modules/eslint-plugin-react',
      'node_modules/gulp',
      'node_modules/gulp-babel',
      'node_modules/gulp-eslint',
      'node_modules/gulp-if',
      'node_modules/gulp-plumber',
      'node_modules/gulp-postcss',
      'node_modules/gulp-sass',
      'node_modules/gulp-watch',
      'node_modules/postcss-calc',
      'node_modules/postcss-reporter',
      'node_modules/rucksack-css',
      'node_modules/run-sequence',
      'node_modules/stylelint',
      'node_modules/stylelint-config-makotot',
      'node_modules/vinyl-buffer',
      'node_modules/vinyl-source-stream',
      'node_modules/watchify'
    ]
  }, function (err, path) {
    if (err) {
      console.error(err);
    }
    console.log(path);
    done();
  });
});

