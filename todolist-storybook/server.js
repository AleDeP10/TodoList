import handler from 'serve-handler';
import http from 'http';

http.createServer((request, response) => {
  return handler(request, response, {
    public: 'storybook-static',
    cleanUrls: true,
    rewrites: [
      { source: '/iframe.html', destination: '/iframe.html' },
    ],
  });
}).listen(6006);