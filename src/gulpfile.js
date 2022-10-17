import pkg from 'gulp';
const { src, dest,series,watch } = pkg;
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)
import babel from "gulp-babel"
import terser from "gulp-terser"
import pug from "gulp-pug"
import csso from "gulp-csso"
import include from "gulp-file-include"
import htmlmin from "gulp-htmlmin"
import del from "del"
import concat from "gulp-concat"
import authoprefixer from "gulp-autoprefixer"
import sync from "browser-sync"
sync.create()

function clear(){
    return del("public/gulpdist")
}

function pug_compile(){
    return src("public/pug_files/**.pug")
        .pipe(pug())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest("public/gulpdist/html"))
}
function appjs(){
    return src("index.js")
        .pipe(babel())
        .pipe(terser())
        .pipe(dest("gulpdist"))
}

function routerjs(){
    return src("router.js")
        .pipe(babel())
        .pipe(terser())
        .pipe(dest("gulpdist"))
}

function serv(){
    sync.init({
        server: "public/gulpdist"
    })
    watch("public/pug_files/**.pug",series(pug_compile)).on("change",sync.reload)
    watch("public/stylesheet_files/**.sass",series(sass_compile)).on("change",sync.reload)
}

function sass_compile(){
    return src("public/stylesheet_files/**.sass")
        .pipe(sass())
        .pipe(csso())
        .pipe(dest("public/gulpdist/css"))
}

export var build = series(clear,appjs,routerjs, sass_compile,pug_compile)
export var serve = series(clear, sass_compile,pug_compile,serv)