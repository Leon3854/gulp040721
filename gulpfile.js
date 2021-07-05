const project_folder = "dist";
const source_folder = "#src";
const path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/"

  },
  src: { // тут мы всё выполняем 
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/script.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.ttf"
  },
  watch: { // тут мы всё время слушаем
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
  },
  clean: "./" + project_folder + "/" // этот объект будет удалять и чисть паку каждый раз как мы запускаем gulp
}

const {src, dest} = require("gulp"),
gulp = require('gulp'),
browsersync = require('browser-sync').create(), // будет обновлять наш браузер
fileinclude = require('gulp-file-include'), // будет подключать файлы
del = require('del');


function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/" //Уакзываем базовую папку
    },
    port: 3000, //Порт по которому будет открываться браузер
    notify: false // что бы не выодилась таблица при обновление браузера
  })
}

// данная функция для работы с html она будет возвращать нам путь к нашему объекту в ктором есть ключ html
// через оператор пайп мы будем обращаться к объекту в котором мы будем складывать наши файлы и скрипты
// Методы src() и dest() используются для взаимодействия с файлами на вашем компьютере.
function html() {
  return src(path.src.html)
  .pipe(fileinclude())
  .pipe(dest(path.build.html))// получает строку пути выходного каталога, а также создает поток Node. Когда метод получает файл, переданный через конвейер, он записывает содержимое и другие детали в файловую систему в данном каталоге.
  .pipe(browsersync.stream())// будем отслеживать изменения в html сримить
}

function watchFiles(params) {
  gulp.watch([path.watch.html], html)
}

function clean(params) {
  return del(path.clean)
}

const build = gulp.series(html);
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.build = build;
exports.watch = watch;//
exports.default = watch; // при запуске gulp эта переменная будет запускаться по умолчанию
// который будет по умолчанию запускать gulp которой в свою очередь будет запускать browserSync 