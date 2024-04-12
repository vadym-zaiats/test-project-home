import gulp from "gulp";
// очистка папки
import clean from "gulp-clean";
// компиляция в css
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import rename from "gulp-rename";
// миницикация css
import cssClean from "gulp-clean-css";
// кроссбраузерность
import autoprefixer from "gulp-autoprefixer";
// конкантинация js
import jsConcat from "gulp-concat";
// удаление неиспользуемого css кода
import unCss from "gulp-uncss";
// миницикация JS
import jsMinify from "gulp-js-minify";
// оптимизация картинок
import imgMin from "gulp-imagemin";
// live server
import { create as bsCreate } from "browser-sync";
const browserSync = bsCreate();

gulp.task("clean-all", () => {
  return gulp.src("./dist/**/*").pipe(clean());
});

gulp.task("css-build", () => {
  return gulp
    .src("./src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      unCss({
        html: ["index.html"],
        ignore: [/\.header__content--nav_list.on/],
      })
    )
    .pipe(cssClean({ compatibility: "ie8" }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
});

gulp.task("js-build", () => {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(jsConcat("scripts.min.js"))
    .pipe(jsMinify())
    .pipe(gulp.dest("./dist/js"))
    .pipe(browserSync.stream());
});

gulp.task("img-min", () => {
  return gulp.src("./src/img/*").pipe(imgMin()).pipe(gulp.dest("./dist/img"));
});

gulp.task("build", async function () {
  return gulp.series("clean-all", "css-build", "js-build", "img-min")();
});

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
  });
});

gulp.task("watch", () => {
  gulp.watch("./src/scss/**/*.scss", gulp.series("css-build"));
  gulp.watch("./src/js/**/*.js", gulp.series("js-build"));
});

gulp.task("dev", () => {
  return gulp.parallel("browser-sync", "watch")();
});

gulp.task("default", () => {
  return gulp.series("build", "dev")();
});
