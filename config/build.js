'use strict'
process.env.NODE_ENV = 'production'

const rm = require('rimraf')
const path = require('path')
// const webpack = require('webpack')
// const webpackConfig = require('./webpack.prod.conf')


rm(path.resolve(__dirname, '../dist/' + process.env.npm_package_version), err => {
    if (err) throw err
    // webpack(webpackConfig, (err, stats) => {
    //   if (err) throw err
    // })
})