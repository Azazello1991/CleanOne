const { src, dest, watch, parallel, series } = require('gulp'); // 

const scss   = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const include = require('gulp-include');



function pages() {
   return src('app/pages/*.html')
      .pipe(include({
         includePaths: 'app/components'
      }))
      .pipe(dest('app'))
      .pipe(browserSync.stream())
}

function fonts() {
   return src('app/fonts/src/*.*') //
      .pipe(fonter({ //
         formats: ['woff', 'ttf']
      }))
      .pipe(src('app/fonts/*.ttf')) //
      .pipe(ttf2woff2()) //
      .pipe(dest('app/fonts')) //
}

function images() {
   return src(['app/images/src/*.*', '!app/images/src/*.svg']) //
      .pipe(newer('app/images')) //
      .pipe(avif({ quality : 50 })) //
      
      .pipe(src('app/images/src/*.*')) //
      .pipe(newer('app/images')) //
      .pipe(webp()) //

      .pipe(dest('app/images')) //
}

function sprite() {
   return src('app/images/src/icons/*.svg') // Берем все файли *.svg с папки 'app/images
      .pipe(svgSprite({ // создаем sprite.svg
         mode: {
            stack: {
               sprite: '../sprite.svg',
               example: true
            }
         }
      }))
      .pipe(dest('app/images')) // Помещаем файл sprite.svg в папку 'app/images'
}

function scripts() {
   return src([ // Добавляем нужные файлы для конкатинации
   'node_modules/swiper/swiper-bundle.js',
   'app/js/main.js',
      // 'app/js/*.js',
      // '!app/js/main.min.js'
   ]) 
   .pipe(concat('main.min.js')) // Соберет указаные файли и вложит в один что в скобках
   // .pipe(uglify()) // через константу uglify(в которой припроцессор) пропускаем наш файл и минифицируем
   .pipe(dest('app/js')) // скомпилированый файл отправляем в app/js
   .pipe(browserSync.stream()) // перезапускаем страницу
}

function minScripts() {
   return src([ // Добавляем нужные файлы для конкатинации
      'node_modules/swiper/swiper-bundle.js',
      'app/js/main.js'
      // 'app/js/*.js',
      // '!app/js/main.min.js'
   ]) 
   .pipe(concat('main.min.js')) // Соберет указаные файли и вложит в один что в скобках
   .pipe(uglify()) // через константу uglify(в которой припроцессор) пропускаем наш файл и минифицируем
   .pipe(dest('app/js')) // скомпилированый файл отправляем в app/js
   .pipe(browserSync.stream()) // перезапускаем страницу
}

function styles() {
   return src('app/scss/style.scss') // получаем файл style.scss (может быть несколько)
      .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] })) // добавляем префыкси
      .pipe(concat('style.min.css')) // Соберет подключонные файли в style.scss в один style.min.css
      .pipe(scss({ outputStyle: 'compressed' })) // через константу scss минифицируем наш файл style.min.css
      .pipe(dest('app/css')) // скомпилированый и минифицированый файл отправляем в app/css
      .pipe(browserSync.stream())  // перезапускаэм браузер
}

function watching() {
   browserSync.init({
      server: {
         baseDir: "app/"
      }
   });
   watch(['app/scss/**/*.scss'], styles) // наблюдаем за изменениями в файле style.scss, и если есть изменения, то запускаем функцию styles
   watch(['app/images/src'], images) // наблюдаем за изменениями в файле style.scss, и если есть изменения, то запускаем функцию styles
   watch(['app/js/main.js'], scripts) // наблюдаем за изменениями в файле main.js, и если есть изменения, то запускаем функцию scripts
   watch(['app/components/**/*.html','app/pages/*'], pages) // 
   watch(['app/**/*.html']).on('change', browserSync.reload) // наблюдаем за изменениями у ВСЕХ файлах html (*.html) у всех папках app/**/*.html
}

function building() {
   return src([
      'app/css/style.css',
      'app/css/style.min.css',
      'app/images/*.*',
      '!app/images/*.svg',
      'app/images/sprite.svg',
      'app/fonts/*.*',
      'app/js/main.min.js',
      'app/js/main.js',
      'app/**/*.html'
   ], { base: 'app' }) // {base: 'app'} сохраняет структуру папок как у app
   .pipe(dest('dist'))
}

function cleanDist() {
   return src('dist')
   .pipe(clean())
}





// Экспортируем нашу функцию для возможности запустка через консоль
exports.styles = styles;
exports.fonts = fonts;
exports.images = images; 
exports.sprite = sprite; 
exports.scripts = scripts; 
exports.minScripts = minScripts; 
exports.watching = watching; 
exports.building = building; 
exports.pages = pages; 

exports.build = series(minScripts, cleanDist, building); // Запускаем по очереди
exports.default = parallel(styles, images, scripts, pages, watching); // будет запускатся по дефолту при запуске gulp паралельно









