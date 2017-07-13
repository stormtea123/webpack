var gulp = require('gulp');
var pxtorem = require('gulp-pxtorem');
var pxtoremOptions = {
    rootValue: 100,
    unitPrecision: 5,
    propList: ["width", "height", "padding", "padding-top", "padding-right", "padding-bottom", "padding-left", "margin", "margin-top", "margin-right", "margin-bottom", "margin-left","border-radius","border","border-left","border-top","border-right","border-bottom","background-size","top","left","right","bottom","font-size","line-height","min-width","min-height"],
    selectorBlackList: [],
    replace: true,
    mediaQuery: false,
    minPixelValue: 2
};

var postcssOptions = {
    map: true
};
gulp.task('css', function() {
    gulp.src(['src/css/*.css'])
        .pipe(pxtorem(pxtoremOptions, postcssOptions))
        .pipe(gulp.dest('src/css/'));
});
gulp.task('watch', function() {
    gulp.watch(['src/css/*.css'], ['css']);
});
gulp.task('default', ['watch', 'css']);