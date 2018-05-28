'use strict';

module.exports = appInfo => {
  const config = exports = {
    cluster :{
      listen: {
        port: 4000,
        hostname: '127.0.0.1',
        // path: '/var/run/egg.sock',
      }
    },
    mysql :{
      // database configuration
      client: {
        // host
        host: '10.105.92.125',
        // port
        port: '3306',
        // username
        user: 'yinzc',
        // password
        password: 'yin53719.',
        // database
        database: 'testdb1',    
      },
      // load into app, default is open
      app: true,
      // load into agent, default is close
      agent: false,
    }
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1527326420443_4189';
  // add your config here
  config.middleware = [];

  return config;
};
