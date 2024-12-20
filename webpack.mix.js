const mix = require('laravel-mix')
const webpack = require('webpack')

mix
  .setPublicPath('dist')
  .js('resources/js/field.js', 'js')
  .vue({ version: 3 })
  .webpackConfig({
    externals: {
      vue: 'Vue',
    },
    resolve: {
      alias: {
        '@': '/vendor/laravel/nova/resources/js',
      },
    },
    output: {
      uniqueName: 'outline/nova-locale-field',
    },
  })
  .disableNotifications()