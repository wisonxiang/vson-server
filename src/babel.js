require('module-alias/register');
require('@babel/register')({
  presets: ['@babel/env'],
});

require('./app.js');
