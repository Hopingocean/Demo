/**
 * Created by Lee on 2017/5/15.
 */
var gulp = require('gulp');

var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var assetRev = require('gulp-asset-rev');
var runSequence = require('run-sequence');

var cache = require('gulp-cache');
var clean = require('gulp-clean');

var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');

var babel = require('gulp-babel');
// var es2015 = require('babel-preset-es2015');

var livereload = require('gulp-livereload');
var browserSync = require('browser-sync').create();

var cssSrc = 'src/css/*.css';
var jsSrc = 'src/js/*.js';
var imgSrc = 'src/images/**/*.{png, jpg, jepg, gif, ico}';
var cssMinSrc = 'dist/css/*.css';
var jsMinSrc = 'dist/js/*.js';
var imgMinSrc = 'dist/images/**/*.{png, jpg, jepg, gif, ico}';

// 构建之前删除生产环境下的文件
gulp.task('clean', function () {
  gulp.src(['dist/js', 'dist/css', 'dist/images'], { read: false })
    .pipe(clean());
});

// 复制额外内容
gulp.task('copy', function () {
  gulp.src(['src/libs/**/', 'src/plugins/**/'], { base: './src/' })
    .pipe(gulp.dest('dist'));
});

// ES6转ES5
gulp.task('babel', function () {
  return gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js'));
});

// 压缩CSS
gulp.task('cssmin', function () {
  return gulp.src('dist/css/*.css')
    // .pipe(concat('index.css'))
    .pipe(cssmin())
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css/'));
});

// CSS生成hash编码并生成rev-manifest.json文件名对照映射
gulp.task('revCss', function () {
  return gulp.src(cssSrc)
    .pipe(cssmin())  
    .pipe(rev())
    .pipe(gulp.dest('dist/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/css'));
})

// 压缩JS
gulp.task('jsmin', function () {
  return gulp.src(['dist/js/*.js'])
    // .pipe(concat('index.js'))
    .pipe(uglify({
      mangle: true,//是否修改变量名
      compress: true,//是否完全压缩
      preserveComments: 'all'//保留所有注释
    }))
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
});

// JS生成文件hash编码并生成rev-manifest.json文件名对照映射
gulp.task('revJs', function () {
  return gulp.src(jsSrc)
    .pipe(uglify({
      mangle: true,
      compress: true,
      preserveComments: 'all'
    }))
    .pipe(rev())
    .pipe(gulp.dest('dist/js'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/js'));
})

// 压缩HTML
gulp.task('htmlmin', function () {
  var option = {
    removeComments: true,
    collapseWhitespace: true,//压缩html
    collapseBooleanAttributes: true,//省略布尔属性的值
    removeEmptyAttributes: true,//删除属性值为空的属性
    minifyJS: true,
    minifyCSS: true
  };
  return gulp.src('src/*.html')
    .pipe(htmlmin(option))
    .pipe(gulp.dest('dist'));
});
// HTML替换CSS、JS文件版本
gulp.task('revHtml', function () {
  return gulp.src(['dist/**/*.json', 'dist/*.html'])
    .pipe(revCollector())
    .pipe(gulp.dest('dist'))
});

// 为CSS中引入的图片/字体等添加hash编码
gulp.task('assetRev', function () {
  return gulp.src(cssSrc)
    .pipe(assetRec())
    .pipe(gulp.dest('src/css'));
})
// images根据MD5获取版本号
gulp.task('revImg', function () {
  return gulp.src(imgSrc)
    // .pipe(cache(imagemin()))  
    .pipe(rev())
    .pipe(gulp.dest(imgMinSrc))
    .pipe(rev.manifest())
    .pipe(gulp.dest(imgMinSrc));
})
// 压缩图片
gulp.task('imgmin', function () {
  gulp.src('src/images/**/*.{png, jpg, gif, ico}')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/images'));
});

// 监控文件是否有更改,若修改则执行相应命令
gulp.task('watch', function () {
  gulp.watch('src/css/*.css', ['cssmin']);
  gulp.watch('src/js/*.js', ['jsmin']);
  gulp.watch('src/images/**/*.{png, jpg, gif, ico}', ['imgmin']);
  gulp.watch('src/*.html', ['htmlmin']);
});

// 开启开发版服务器
gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: ['./src']
    },
    browser: 'chrome'
  });
});

// 开启生产版本服务器
gulp.task('server-dist', function () {
  browserSync.init({
    server: {
      baseDir: ['./dist']
    },
    browser: 'chrome'
  });
})

// gulp.task('default', ['cssmin', 'revCss', 'jsmin', 'revJs', 'revHtml']);

// 先生成hash值再压缩，如果先压缩再生成hash值会因为内容未改变而不能替换文件名，可以通过修改参数
// rev-collector中的参数replaceReved，设置replaceReved标识, 用来说明模板中已经被替换的文件是否还能再被替换,默认是false,只替换被修改的文件。
gulp.task('default', function (done) {
  // 此处不能用gulp.run这个最大限度并行（异步）执行的方法，需要使用runSequence串行方法（顺序执行）才能够在html中加入版本号
  runSequence(
    'revCss',
    // 'cssmin',
    'revJs',
    // 'jsmin',
    // 'revImg',
    'imgmin',
    'htmlmin',
    'revHtml',
    // 'assetRev',
    done
  );
});