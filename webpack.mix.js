const mix = require('laravel-mix');

mix
    .setPublicPath('dist')
    .js('resources/js/field.js', 'js')
    .vue({version: 3})
    .webpackConfig({
        externals: {
        vue: 'Vue',
        'laravel-nova': 'LaravelNova'
        },
        output: {
        uniqueName: 'anninikolova/nova-locale-field',
        },

    })