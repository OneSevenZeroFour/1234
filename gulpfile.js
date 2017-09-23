var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('compileSass',function(){
    setTimeout(function(){
        return gulp.src('./src/sass/*.scss')
                .pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError))
                .pipe(gulp.dest('./src/css'));
    },500)
});
gulp.task('Jtsass',function(){
    gulp.watch('./src/sass/*.scss',['compileSass']);
});
// var concat = require('gulp-concat');
// var rename = require('gulp-rename');
// var uglify = require('gulp-uglify');
// gulp.task('mergeJs',function(){
//     return gulp.src('./src/js/*.js')
//             .pipe(concat('all.js'))
//             .pipe(gulp.dest('./dist/js'))
//             .pipe(uglify())
//             .pipe(rename({suffix:'.min'}))
//             .pipe(gulp.dest('./dist/js'))
// })

var browserSync = require('browser-sync');
gulp.task('server',function(){
    browserSync({
        // 静态服务器
        // server:'./src/',

        // 代理服务器
<<<<<<< HEAD
        proxy:'http://localhost:1234',
=======
        proxy:'http://localhost:2345',
>>>>>>> 450b8a57051babc3d351a0da37a11afdcc1f8d3c

        // 端口
        port:2008,

        // 监听文件修改，自动刷新浏览器
        files:['./src/js/*.html','./src/css/*.css','./src/api/*.php','./src/js/*.js']
    });



    // 开启服务器的同时，监听sass的修改
    gulp.watch('./src/**/*.scss',['compileSass']);
    // gulp.watch('./src/**/*.js',['mergeJs']);
    
})