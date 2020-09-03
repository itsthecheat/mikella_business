// generated on 2017-04-10 using generator-webapp 2.4.1
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('gulp4-run-sequence');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const { argv } = require('yargs');
const port = argv.port || 9000;

var dev = true;

gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['clean', 'wiredep', 'styles', 'scripts', 'images', 'html', 'fonts', 'extras', 'watch'], 'build', resolve);
  });
});

// inject bower components
gulp.task('wiredep', done => {
  gulp.src('app/styles/*.scss')
    .pipe($.filter(file => file.stat && file.stat.size))
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
    done();
});

gulp.task('styles', done => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer())
    .pipe($.if(dev, $.sourcemaps.write()))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
    done();
});

gulp.task('scripts', done => {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.babel())
    .pipe($.if(dev, $.sourcemaps.write('.')))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
    done();
});

function lint(files) {
  return gulp.src(files)
    .pipe($.eslint({ fix: true }))
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('app/scripts/**/*.js')
    .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js')
    .pipe(gulp.dest('test/spec'));
});

gulp.task('html', gulp.parallel('styles', 'scripts'), () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if(/\.js$/, $.uglify({compress: {drop_console: true}})))
    .pipe($.if(/\.css$/, $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if(/\.html$/, $.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: {compress: {drop_console: true}},
      processConditionalComments: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', done => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
    done();
});

gulp.task('fonts', done => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
    .pipe($.if(dev, gulp.dest('.tmp/fonts'), gulp.dest('dist/fonts')));
    done();
});

gulp.task('extras', done => {
  return gulp.src([
    'app/*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
  done();
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', gulp.series('clean', 'wiredep', 'fonts', 'images', 'extras', 'html', gulp.parallel(watch)), done => {
done();
});

function watch() {
  browserSync.init({
    notify: false,
    port,
    server: {
      baseDir : ['.tmp','app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });
  gulp.watch([
    'app/*.html',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);
  gulp.watch('app/styles/**/*.scss', gulp.series('styles'));
  gulp.watch('app/scripts/**/*.js', gulp.series('scripts'));
  gulp.watch('app/fonts/**/*', gulp.series('fonts'));
  gulp.watch('bower.json', gulp.series('wiredep', 'fonts'));
}


gulp.task('serve:dist', gulp.parallel('default'), () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', gulp.series('scripts'), () => {
  browserSync.init({
    notify: false,
    port,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', gulp.series('scripts'));
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', gulp.series('lint:test'));
});

gulp.task('build', gulp.parallel('lint', 'html', 'images', 'fonts', 'extras'), done => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
  done();
});

exports.watch = watch;
