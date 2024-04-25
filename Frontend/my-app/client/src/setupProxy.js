const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/requirements',  // the endpoint you are trying to proxy
    createProxyMiddleware({
      target: 'http://localhost:5000',  // the address of your backend server
      changeOrigin: true,
    })
  );
 };
