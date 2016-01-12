var gulp = require('gulp');
var browserSync = require('browser-sync').create(); //初始化
var reload      = browserSync.reload; // browser-sync 页面刷新


//定义默认 和运行模块
gulp.task('default',function (){
  gulp.run('browser-sync');
});
//监控刷新页面
gulp.task('browser-sync',function (){
  browserSync.init({
    server:{
      baseDir:'./'
    }
  });
  gulp.watch(["thread/*.html","assets/css/app.css"]).on('change', reload); //监听 html
});