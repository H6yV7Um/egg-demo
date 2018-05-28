'use strict';

module.exports = appInfo => {
  const config = exports = {
    cluster :{
      listen: {
        port: 4000,
        hostname: '127.0.0.1',
        // path: '/var/run/egg.sock',
      }
    }
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1527326420443_4189';
  // add your config here
  config.middleware = [];

  return config;
};
