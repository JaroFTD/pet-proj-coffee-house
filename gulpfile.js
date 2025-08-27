const { src, dest, parallel, series, watch, gulp } = require('gulp');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const webpack = require('webpack-stream');
const changed = require('gulp-changed')
const imageminWebp = require('imagemin-webp')
const replace = require('gulp-replace');
const webpHTML = require('gulp-webp-retina-html');
const fs = require('fs');
const fonter = require('gulp-fonter-fix');
const ttf2woff2 = require('gulp-ttf2woff2');

const srcFolder = 'src';
const destFolder = 'dist';
const isDev = process.env.NODE_ENV === 'development';

function clean() {
   return del('dist/*');
}

function server() {
   browserSync.init({
      server: { baseDir: 'dist/' },
      notify: false,
      online: true
   });
}

function html() {
   return src('src/*.html')
      .pipe(fileInclude({
         prefix: '@@',
         basepath: '@file'
      }))
      .pipe(
         replace(/<img(?:.|\n|\r)*?>/g, function (match) {
            return match
               .replace(/\r?\n|\r/g, '')
               .replace(/\s{2,}/g, ' ');
         })
      )
      .pipe(
         replace(
            /(?<=src=|href=|srcset=)(['"])(\.(\.)?\/)*(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
            '$1./$4$5$7$1'
         )
      )
      .pipe(
         webpHTML({
            extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            // retina: {
            //    1: '',
            //    2: '@2x',
            // },
         })
      )
      .pipe(dest('dist/'))
      .pipe(browserSync.stream());
}

function styles() {
   return src('src/scss/style.scss')
      .pipe(gulpif(isDev, sourcemaps.init()))
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([
         autoprefixer({ overrideBrowserslist: ['last 10 versions'] }),
         cssnano()
      ]))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulpif(!isDev, cleanCSS({ level: 2 })))
      .pipe(gulpif(isDev, sourcemaps.write('.')))
      .pipe(dest('dist/css/'))
      .pipe(browserSync.stream());
}

function scripts() {
   return src('src/js/script.js')
      .pipe(webpack(require('./webpack.config.js')))
      .pipe(dest('dist/js/'))
      .pipe(browserSync.stream())
}

function images() {
   return src('src/img/**/*.{jpg,jpeg,png,webp,avif,gif}')
      .pipe(changed('dist/img/'))
      .pipe(
         imagemin([
            imageminWebp({
               quality: 85,
            }),
         ])
      )
      .pipe(rename({ extname: '.webp' }))
      .pipe(dest('dist/img/'))
      .pipe(src('src/img/**/*.{jpg,jpeg,png,webp,avif,gif}'))
      .pipe(changed('dist/img/'))
      .pipe(
         imagemin(
            [
               imagemin.gifsicle({ interlaced: true }),
               imagemin.mozjpeg({ quality: 85, progressive: true }),
               imagemin.optipng({ optimizationLevel: 5 }),
            ],
            { verbose: true }
         )
      )
      .pipe(dest('dist/img/'))
}

const svgStack = {
   mode: {
      stack: {
         example: true,
      },
   },
};

const svgSymbol = {
   mode: {
      symbol: {
         sprite: '../sprite.symbol.svg',
      },
   },
   shape: {
      transform: [
         {
            svgo: {
               plugins: [
                  {
                     name: 'removeAttrs',
                     params: {
                        attrs: '(fill|stroke)',
                     },
                  },
               ],
            },
         },
      ],
   },
};

function svgSt() {
   return src('src/img/svgicons/**/*.svg')
      .pipe(svgSprite(svgStack))
      .pipe(dest('dist/img/svgsprite/'));
}

function svgSy() {
   return src('src/img/svgicons/**/*.svg')
      .pipe(svgSprite(svgSymbol))
      .pipe(dest('dist/img/svgsprite/'));
};

function otfToTtf() {
   // Ищем файлы шрифтов .otf
   return src(`${srcFolder}/fonts/*.otf`, {})
      // Конвертируем в .ttf
      .pipe(
         fonter({
            formats: ['ttf'],
         })
      )
      // Выгружаем в исходную папку
      .pipe(dest(`${srcFolder}/fonts/`))
}
function ttfToWoff() {
   // Ищем файлы шрифтов .ttf
   return src(`${srcFolder}/fonts/*.ttf`, {})
      // Конвертируем в .woff2
      .pipe(ttf2woff2())
      // Выгружаем в папку с результатом
      .pipe(dest(`${destFolder}/fonts/`))
}
function fontsStyle() {
   // Файл стилей подключения шрифтов
   let fontsFile = `${srcFolder}/scss/base/fonts.scss`;
   // Проверяем существуют ли файлы шрифтов
   fs.readdir(`${destFolder}/fonts/`, function (err, fontsFiles) {
      if (fontsFiles) {
         // Проверяем существует ли файл стилей для подключения шрифтов

         // Если файла нет, создаем его
         fs.writeFile(fontsFile, '', cb);
         let newFileOnly;
         for (var i = 0; i < fontsFiles.length; i++) {
            // Записываем подключения шрифтов в файл стилей
            let fontFileName = fontsFiles[i].split('.')[0];
            if (newFileOnly !== fontFileName) {
               let fontName = fontFileName.split('-')[0]
                  ? fontFileName.split('-')[0]
                  : fontFileName;
               let fontWeight = fontFileName.split('-')[1]
                  ? fontFileName.split('-')[1]
                  : fontFileName;
               if (fontWeight.toLowerCase() === 'thin') {
                  fontWeight = 100;
               } else if (fontWeight.toLowerCase() === 'extralight') {
                  fontWeight = 200;
               } else if (fontWeight.toLowerCase() === 'light') {
                  fontWeight = 300;
               } else if (fontWeight.toLowerCase() === 'medium') {
                  fontWeight = 500;
               } else if (fontWeight.toLowerCase() === 'semibold') {
                  fontWeight = 600;
               } else if (fontWeight.toLowerCase() === 'bold') {
                  fontWeight = 700;
               } else if (
                  fontWeight.toLowerCase() === 'extrabold' ||
                  fontWeight.toLowerCase() === 'heavy'
               ) {
                  fontWeight = 800;
               } else if (fontWeight.toLowerCase() === 'black') {
                  fontWeight = 900;
               } else {
                  fontWeight = 400;
               }
               fs.appendFile(
                  fontsFile,
                  `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
                  cb
               );
               newFileOnly = fontFileName;
            }
         }

      }
   });

   return src(`${srcFolder}`);
   function cb() { }
}

function watchFiles() {
   watch('src/**/*.html', html);
   watch('src/scss/**/*.scss', styles);
   watch('src/js/**/*.js', scripts);
   watch('src/img/**/*.{jpg,jpeg,png,webp,avif,gif}', images);
   watch('src/img/svgicons/**/*.svg', svgSt, svgSy);
}

exports.default = series(
   clean,
   parallel(html, styles, scripts, images, svgSt, svgSy, series(otfToTtf, ttfToWoff, fontsStyle)),
   parallel(watchFiles, server)
);

exports.build = series(
   clean,
   parallel(html, styles, scripts, images, svgSt, svgSy, series(otfToTtf, ttfToWoff, fontsStyle))
);