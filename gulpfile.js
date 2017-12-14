var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    connect = require('gulp-connect');

gulp.task('html', function() {
  gulp.src('index.html').pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    port: 3001, //端口号，可不写，默认8000
    root: './', //当前项目主目录
    livereload: true //自动刷新
  });
});

gulp.task('watch', function() {
  gulp.watch('marquee.js', ['html']); //监控js文件
  gulp.watch('index.html', ['html']); //监控html文件
});

gulp.task('build', function() {
  gulp.src('marquee.js').pipe(uglify()).pipe(gulp.dest('./dist'));
});

//执行gulp server开启服务器，浏览器打开地址
gulp.task('server', ['connect', 'watch']);