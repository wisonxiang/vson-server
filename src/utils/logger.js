import log4js from 'log4js';
import path from 'path';

const basePath = path.resolve('./logs');

log4js.configure({
  replaceConsole: true,
  appenders: {
    out: { type: 'stdout' },
    info: {
      category: 'infoLog',
      type: 'dateFile',
      filename: basePath + '/info/info.log',
      pattern: 'yyyy-MM-dd-hh',
      keepFileExt: true,
      alwaysIncludePattern: true,
    },
    error: {
      category: 'errorLog',
      type: 'dateFile',
      filename: basePath + '/error/error.log',
      pattern: 'yyyy-MM-dd-hh',
      keepFileExt: true,
      alwaysIncludePattern: true,
    },
  },
  categories: {
    default: { appenders: ['out'], level: 'debug' },
    dev: { appenders: ['info'], level: 'info' },
    prod: { appenders: ['error'], level: 'warn' },
  },
});

// export const logger = log4js.getLogger();
// export const devLogger = log4js.getLogger('dev');
// export const prodLogger = log4js.getLogger('prod');

export const logger = log4js.getLogger('prod');
