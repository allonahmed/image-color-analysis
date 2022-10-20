const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://10.68.117.80:8092',
      changeOrigin: true,
    })
  );
};