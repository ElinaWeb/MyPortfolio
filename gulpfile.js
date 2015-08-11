var gulp=require("gulp"),
browserSync=require('browser-sync');
gulp.task('server',function(){
	browserSync({
		port:9000,
		server:{
			baseDir:'app/public_html/'
		}
	})
})
gulp.task('watch',function(){
	gulp.watch([
		'app/public_html/*.html',
		'app/public_html/js/*.js',
		'app/public_html/css/*.css'
		]).on('change',browserSync.reload);
});
gulp.task('default',['server','watch']);