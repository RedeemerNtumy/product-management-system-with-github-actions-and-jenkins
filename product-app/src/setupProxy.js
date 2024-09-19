const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080',  // assuming your Spring Boot app runs here
            changeOrigin: true,
        })
    );
};
